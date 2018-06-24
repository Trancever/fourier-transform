import React from "react";
import { renderToTerminal } from "@react-slate/core";
import throttle from "lodash/throttle";

import App from "./src/App";

renderToTerminal(<App />, process.stdout);

process.on(
  "resize",
  throttle(() => {
    renderToTerminal(<App />, process.stdout);
  }, 100)
);
