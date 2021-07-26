import { spawnSync } from "child_process";
import findJavaHome from "find-java-home";
import path from "path";
import { ephConfigs, setConfig } from "./config";

export interface Java {
  dir: string;
  name: string;
  is64Bit: boolean;
}

export function checkJavaVersion(dir: string): Promise<Java | null> {
  return new Promise((resolve) => {
    try {
      const pro = spawnSync(dir, ["-version"]);
      if (pro.error) {
        resolve(null);
      } else {
        const data = pro.stderr.toString();
        const name = data.match(/"(.*?)"/)?.pop();
        if (name) {
          resolve({
            dir,
            name,
            is64Bit: data.toLowerCase().includes("64-bit"),
          });
        } else {
          resolve(null);
        }
      }
    } catch {
      resolve(null);
    }
  });
}

export function detectJava(): Promise<Java | null> {
  return new Promise((resolve) =>
    findJavaHome((err, res) => {
      if (err) {
        resolve(null);
      } else {
        checkJavaVersion(path.join(res, "bin", "java")).then(resolve);
      }
    })
  );
}

export function createJava(java: Java): void {
  setConfig(() => ephConfigs.javas.push(java));
}

export function removeJava(id: number): void {
  setConfig(() => ephConfigs.javas.splice(id, 1));
}