import fs from "fs";
import got from "got";
import path from "path";
import crypto from "crypto";
import { DefaultFn, ErrorHandler, unwrapFunction } from "../tools";
import { MutableRefObject } from "react";

export function createDirIfNotExist(p: string): void {
  try {
    fs.accessSync(p);
  } catch {
    fs.mkdirSync(p, { recursive: true });
  }
}

// create a folder which the file is in
export function createDirByPath(p: string): void {
  createDirIfNotExist(path.dirname(p));
}

export function downloadFile(
  url: string,
  target: string,
  onError?: ErrorHandler,
  cancellerWrapper?: MutableRefObject<DefaultFn | undefined>
): Promise<void> {
  return new Promise((resolve) => {
    createDirByPath(target);
    const downloadStream = got.stream(url);
    const fileStream = fs.createWriteStream(target);
    downloadStream.on("error", unwrapFunction(onError));
    fileStream.on("error", unwrapFunction(onError)).on("finish", resolve);
    cancellerWrapper &&
      (cancellerWrapper.current = () => {
        try {
          downloadStream.destroy();
          fileStream.destroy();
          fs.rmSync(target);
        } catch {}
      });
    downloadStream.pipe(fileStream);
  });
}

export function calculateHash(file: string, type: "sha1"): string {
  const data = fs.readFileSync(file);
  return crypto.createHash(type).update(data).digest("hex");
}
