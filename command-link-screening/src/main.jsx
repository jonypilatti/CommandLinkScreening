import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "../redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Form from "./components/Form.jsx";
import ThankYou from "./components/ThankYou";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/thankyou",
    element: <ThankYou />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
