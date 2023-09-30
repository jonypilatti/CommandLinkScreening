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
console.log(store.getState(), "LA STORE QUE QUIERO VER");
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
