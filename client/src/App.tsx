import "./App.css";
import store from "./store/index";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Rick and Morty</h1>
      </header>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
