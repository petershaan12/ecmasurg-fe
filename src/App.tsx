import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import ProtectedRoute from "./utils/ProtectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/sonner";
import Loading from "./components/Loading";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <div className="min-h-screen flex">
          <Navbar />
          <main id="zero-state">
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          </main>
          <Toaster />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
