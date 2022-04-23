import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export interface Route {
  path: string;
  element: React.FC;
  isPrivate: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    element: Home,
    isPrivate: true,
  },
  {
    path: "/login",
    element: Login,
    isPrivate: false,
  },
  {
    path: "/register",
    element: Register,
    isPrivate: false,
  },
];

export default routes;
