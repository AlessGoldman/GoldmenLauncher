import { shell } from "electron";
import { ReactNode } from "react";
import { unwrapFunction } from "../tools";
import { DefaultFunction } from "../tools/types";
import { Typography } from "./layouts";

export function Button(props: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: DefaultFunction;
  textInherit?: boolean;
  variant?: "contained" | "default";
}): JSX.Element {
  return (
    <button
      disabled={props.disabled ?? false}
      type="button"
      className={`flex select-none items-center px-4 py-2 rounded-lg text-sm font-medium m-1 focus:outline-none
        ${
          props.variant === "contained"
            ? `text-white ${
                props.disabled
                  ? "bg-blue-800 dark:bg-gray-700 text-gray-200"
                  : "transition-colors duration-200 transform bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              }` // eph-btn-contained
            : `bg-gray-500 bg-opacity-0 ${
                props.disabled
                  ? ""
                  : "transition-colors duration-200 transform hover:bg-opacity-5 active:bg-opacity-10"
              } ${props.textInherit ? "" : "text-black dark:text-white"}` // eph-btn-text
        }
        ${props.disabled ? "cursor-not-allowed text-shallow" : ""}
        ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function IconButton(props: {
  children: ReactNode;
  className?: string;
  onClick?: DefaultFunction;
  textInherit?: boolean;
}): JSX.Element {
  return (
    <button
      className={`rounded-full select-none ${
        props.textInherit ? "" : "text-black dark:text-white"
      } focus:outline-none h-12 w-12 flex items-center justify-center transition-colors duration-200 transform hover:bg-black hover:bg-opacity-10 active:bg-opacity-20 ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function Select(props: {
  value: string | number;
  label?: string;
  onChange: (value: string) => void;
  className?: string;
  marginBottom?: boolean;
  children: ReactNode;
  disabled?: boolean;
}): JSX.Element {
  return (
    <div className={props.marginBottom ? "mb-3" : ""}>
      {props.label && (
        <label
          className={`${
            props.disabled ? "text-shallow" : "text-gray-600 dark:text-gray-400"
          } font-bold`}
        >
          {props.label}
        </label>
      )}
      <select
        value={props.value}
        onChange={(ev) => {
          props.onChange(ev.currentTarget.value);
        }}
        className={`block py-2 px-3 bg-card text-black dark:text-white rounded-lg border border-divide shadow-sm focus:outline-none ${props.className}`}
        disabled={props.disabled}
      >
        {props.children}
      </select>
    </div>
  );
}

export function TextField(props: {
  label?: string;
  placeholder?: string;
  icon?: JSX.Element;
  type?: string;
  helperText?: string;
  error?: boolean;
  marginBottom?: boolean;
  trailing?: JSX.Element;
  value?: string;
  className?: string;
  onChange?: (ev: string) => void;
}): JSX.Element {
  return (
    <div className={`${props.marginBottom ? "mb-3" : ""} ${props.className ?? ""}`}>
      {props.label && (
        <label className="text-gray-600 dark:text-gray-400 leading-7 text-sm font-bold">
          {props.label}
        </label>
      )}
      <div className="flex">
        {props.icon && (
          <div className="rounded-l-lg inline-flex items-center px-3 border-t bg-white dark:bg-gray-700 border-l border-b border-divide text-shallow shadow-sm">
            {props.icon}
          </div>
        )}
        <input
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={(ev) => unwrapFunction(props.onChange)(ev.target.value)}
          className={`${
            props.icon && props.trailing
              ? "rounded-none z-10"
              : props.icon
              ? "rounded-r-lg"
              : props.trailing
              ? "rounded-l-lg"
              : "rounded-lg"
          } flex-1 appearance-none border border-divide w-full py-2 px-4 bg-card text-gray-700 dark:text-gray-50 placeholder-gray-400 shadow-sm text-base focus:outline-none ${
            props.error
              ? "ring-1 ring-red-500"
              : "focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          }`}
        ></input>
        {props.trailing && (
          <div className="rounded-r-lg inline-flex items-center px-3 border-t bg-white dark:bg-gray-700 border-r border-b border-divide text-shallow shadow-sm">
            {props.trailing}
          </div>
        )}
      </div>
      {props.helperText && (
        <p className={`text-sm ${props.error ? "text-red-500" : "text-shallow"} -bottom-6`}>
          {props.helperText}
        </p>
      )}
    </div>
  );
}

export function Checkbox(props: {
  children: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}): JSX.Element {
  return (
    <div className="flex items-center">
      <div className="bg-card border rounded-md border-divide w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
        <input
          type="checkbox"
          className="opacity-0 absolute"
          checked={props.checked}
          onChange={(ev) => unwrapFunction(props.onChange)(ev.currentTarget.checked)}
        />
        <svg
          className={`fill-current w-3 h-3 text-blue-500 pointer-events-none ${
            props.checked ? "" : "hidden"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <Typography>{props.children}</Typography>
    </div>
  );
}

export function Link(props: {
  href?: string;
  className?: string;
  type?: "url" | "file" | "clickable";
  onClick?: DefaultFunction;
  children: string;
}): JSX.Element {
  const handleClick = () => {
    if (props.type === "file") {
      shell.showItemInFolder(props.href ?? "");
    } else if (props.type === "clickable") {
      unwrapFunction(props.onClick)();
    } else {
      shell.openExternal(props.href ?? "");
    }
  };
  return (
    <span
      className={`text-blue-500 hover:text-blue-600 cursor-pointer select-none ${props.className}`}
      onClick={handleClick}
    >
      {props.children}
    </span>
  );
}
