import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
//import { useAuth } from "../providers/auth-provider/hook";
import Sidebar from "@/components/sidebar/Sidebar";
import { MedicationPage } from "@/pages/medication";

const Routes = () => {
  //const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: <Sidebar />,
    },
    {
      path: "/remedios",
      element: <MedicationPage />,
    },
  ];

  const router = createBrowserRouter([...routesForPublic]);

  return <RouterProvider router={router} />;
};

export default Routes;
