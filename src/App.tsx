import { Provider } from "react-redux";
import { store } from "./store";
import RoutesApp from "./routes/RoutesApp";

function App() {
  return (
    <Provider store={store}>
      <RoutesApp />
    </Provider>
  );
}

export default App;
