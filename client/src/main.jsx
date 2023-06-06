import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/Store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "843309139504-691iuoec6rv9kcufvkeotnkgbgmfpoai.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId} >
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);