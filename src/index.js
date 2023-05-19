import React, { StrictMode } from "react"; // React
import { createRoot } from "react-dom/client"; // React's library to talk to web browsers
import "./styles.css"; 

import App from "./App"; // React component created in app.js

// Inject components into index.html at root div
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);