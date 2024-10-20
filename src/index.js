"use strict";

import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.js";

import "./styles.css";

const rootElement = document.getElementById("main");
const root = ReactDom.createRoot(rootElement);
root.render(<App />);
