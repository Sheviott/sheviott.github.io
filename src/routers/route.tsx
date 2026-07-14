import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@pages/layouts/Layout";
import CatalogPage from "@pages/catalog/Catalog";
import BlogPage from "@pages/blog/Blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: "blog", element: <BlogPage /> },
    ],
  },
]);
