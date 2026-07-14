import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@pages/layouts/Layout";
import CatalogPage from "@pages/catalog/Catalog";
import BlogPage from "@pages/blog/Blog";
import ItemPage from "@pages/catalog/Item";
import CatPage from "@pages/cat/catPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: "catalog/:id", element: <ItemPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "cat", element: <CatPage /> },
    ],
  },
]);
