import "@fontsource/roboto";
import "styles/index.css";
import { render } from "react-dom";
import App from "./renderer/App";

console.log("Hello, World!");

// mount application
render(<App />, document.getElementById("root"));