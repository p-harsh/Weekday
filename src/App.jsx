import { store } from "./utils/store/store";
import { Provider } from "react-redux";
import Dashboard from "./Views/Dashboard";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
