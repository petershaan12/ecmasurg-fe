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
import DetailStudi from "./pages/Studi/DetailStudi.tsx";
import ModulEdit from "./pages/Modul/ModulEdit.tsx";
import EvaluasiCreate from "./pages/Modul/Evaluasi/EvaluasiCreate.tsx";
import EvaluasiPage from "./pages/Modul/Evaluasi/EvaluasiPage.tsx";
import EvaluasiEdit from "./pages/Modul/Evaluasi/EvaluasiEdit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home key="home" /> },
      { path: "modul", element: <Modul key="modul" /> },
      { path: "modul/create", element: <ModulCreate key="modul-create" /> },
      { path: "modul/:id/edit", element: <ModulEdit key="modul-edit" /> },
      { path: "modul/:id", element: <IsiModul key="isi-modul" /> },
      {
        path: "modul/:id/materi/:idsubmodul",
        element: <MateriPage key="materi-page" />,
      },
      {
        path: "modul/:id/assignment/:idsubmodul",
        element: <AssignmentPage key="assignment-page" />,
      },
      {
        path: "modul/:id/create",
        element: <IsiModulCreate key="isi-modul-create" />,
      },
      {
        path: "modul/:id/edit/:idsubmodul",
        element: <IsiModulEdit key="isi-modul-edit" />,
      },
      {
        path: "modul/:id/evaluasi/:idevaluasi",
        element: <EvaluasiPage key="Evaluasi" />,
      },
      {
        path: "modul/:id/evaluasi/create",
        element: <EvaluasiCreate key="isi-evaluasi-create" />,
      },
      {
        path: "modul/:id/evaluasi/edit/:idevaluasi",
        element: <EvaluasiEdit key="isi-evaluasi-edit" />,
      },
      { path: "profile", element: <Profile key="profile" /> },
      { path: "profile/edit", element: <EditProfile key="edit-profile" /> },
      { path: "studi-kasus", element: <Studi key="studi" /> },
      { path: "studi-kasus/:id", element: <DetailStudi key="detail-studi" /> },
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


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
