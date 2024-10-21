import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/NotFoundPage.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import Modul from "./pages/Modul/Modul.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import ModulCreate from "./pages/Modul/ModulCreate.tsx";
import EditProfile from "./pages/Profile/EditProfile.tsx";
import IsiModul from "./pages/Modul/SubModul.tsx";
import Studi from "./pages/Studi/Studi.tsx";
import App from "./App.tsx";
import IsiModulCreate from "./pages/Modul/SubModulCreate.tsx";
import IsiModulEdit from "./pages/Modul/SubModulEdit.tsx";
import MateriPage from "./pages/Modul/MateriPage.tsx";
import AssignmentPage from "./pages/Modul/AssignmentPage.tsx";

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
      { path: "modul/:id/materi/:idsubmodul", element: <MateriPage /> },
      { path: "modul/:id/assignment/:idsubmodul", element: <AssignmentPage /> },
      { path: "modul/:id/create", element: <IsiModulCreate /> },
      { path: "modul/:id/edit/:idsubmodul", element: <IsiModulEdit /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/edit", element: <EditProfile /> },
      { path: "studi-kasus", element: <Studi /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/404",
    element: <ErrorPage />,
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
