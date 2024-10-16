import { useRouteError } from "react-router-dom";
import TidakDitemukan from "../components/TidakDitemukan";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <main className="flex-grow p-12 overflow-y-auto h-screen">
      <TidakDitemukan />
    </main>
  );
}
