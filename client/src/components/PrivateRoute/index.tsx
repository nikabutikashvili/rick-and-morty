import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isAuth = true; // will be updated once authentification is done
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
