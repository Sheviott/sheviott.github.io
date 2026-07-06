import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@pages/layouts/Layout";
import CatalogPage from "@pages/catalog/Catalog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element:<CatalogPage /> },
      // {
      //   path: "/page", element:<AboutPage />
      // },
    ],
  },
  // {
  //   path: "/register",
  //   element: <></>,
  // },
]);
