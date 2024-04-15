import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { NotificationProvider } from "./context/notificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NotificationProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NotificationProvider>
);
