import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import AreaConverter from "./lsdo.jsx";
import Isdo from "./lsdo.jsx";
import Iksdo from "./lksdo.jsx";
import Try from "./Try.jsx";
import Hello from "./Hello.jsx";
import Date from "./date.jsx";
import III from "./III.jsx";
import App from "./App.jsx";
import DateComponent from "./ThreeDate.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GetQuatation from "./Component/GetQuatation.jsx";
import { FormProvider } from "./FormContext"; // Import the provider
import LandQuatation from "./Component/LandQuatation.jsx";
import VisaQuatation from "./Component/VisaQuatation.jsx";
import EventQuatation from "./Component/EventQuatation.jsx";
import HotelQuatation from "./Component/HotelQuatation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/get-quatation/",
    element: <GetQuatation />,
  },

  {
    path: "/Hotel-quatation/",
    element: <HotelQuatation />,
  },

  {
    path: "/Land-quatation/",
    element: <LandQuatation />,
  },
  {
    path: "/Visa-quatation/",
    element: <VisaQuatation />,
  },

  {
    path: "/Event-quatation/",
    element: <EventQuatation />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  </React.StrictMode>
);
