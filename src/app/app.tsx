import { RouterProvider } from "react-router";
import { router } from "../routers/route";
import Preloader from "@components/ui/preloader/preloader";
import { useAppSelector } from "@services/hooks";
import { selectIsLoading } from "@store/catalog/colorPickerSlice";
function App() {
  const isLoading = useAppSelector(selectIsLoading)

  return (
    <>
      <RouterProvider router={router} />
      { isLoading ?  <Preloader /> : null}
    </>
  );
}

export default App;
