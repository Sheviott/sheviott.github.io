import { RouterProvider } from "react-router";
import { router } from "../routers/route";

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
