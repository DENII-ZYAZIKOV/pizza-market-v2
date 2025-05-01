import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; 
import { Provider } from "react-redux";
import { store } from "./redux/store"; 
import React from "react";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
