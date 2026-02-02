import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CasePage from "./pages/CasePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NavBar from "./components/NavBar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreateCasePage from "./pages/CreateCasePage.jsx";
import EditCaseForm from "./pages/EditCasePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import '../main.css'


const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage />},
          { path: "/signup", element: <SignupPage />},
          { path: "/about", element: <AboutPage/>},
          { path: "/create-a-case", element: <CreateCasePage/>},
          { path: "/case/:id", element: <CasePage />},
          { path: "/case/:id/edit", element: <EditCaseForm/>},
          { path: "/user", element: <UserPage/>}
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
</React.StrictMode>
);