import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/NotFoundPage.tsx";
import Login from "./pages/Login.tsx";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import Modul from "./pages/Modul/Modul.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import ModulCreate from "./pages/Modul/ModulCreate.tsx";
import EditProfile from "./pages/Profile/EditProfile.tsx";
import IsiModul from "./pages/Modul/IsiModul.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "modul", element: <Modul /> },
      { path: "modul/create", element: <ModulCreate /> },
      { path: "modul/:id", element: <IsiModul /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/edit", element: <EditProfile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route errorElement={<ErrorPage />}>
//       <Route path="/" element={<App />}>
//         <Route errorElement={<ErrorPage />}>
//           <Route index element={<Home />} />
//           <Route path="modul" element={<Modul />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//       </Route>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />
//     </Route>
//   )
// );

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
