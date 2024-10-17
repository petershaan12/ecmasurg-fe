import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex">
        <Navbar />
        <main id="zero-state">
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}

export default App;
