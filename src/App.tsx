import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen flex">
        <Navbar />
        <main id="zero-state">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
