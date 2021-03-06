import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import store from "./store/index";
import { Provider } from "react-redux";

import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import routes, { Route as RouteType } from "./configs/routes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route: RouteType, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.isPrivate ? (
                <PrivateRoute>
                  <route.element />
                </PrivateRoute>
              ) : (
                <route.element />
              )
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <App />
      </div>
    </Provider>
  );
};

export default AppWrapper;
