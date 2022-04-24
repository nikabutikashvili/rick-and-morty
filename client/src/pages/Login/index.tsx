import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { login } from "../../store/auth";
import styles from "./Login.module.css";
import LoaderWithApi from "../../components/LoaderWithApi";

export interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const successCallback = (): void => {
    navigate("/");
  };

  const errorCallback = (message: string): void => {
    setLoading(false);
    setErrorMessage(message);
  };

  const onSubmit = (event: any): void => {
    event.preventDefault();
    setLoading(true);
    dispatch(
      login({
        body: user,
        succesCallBack: successCallback,
        errorCallBack: errorCallback,
      }) as any
    );
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={Logo} alt="logo" />
      <div>
        <LoaderWithApi
          load={loading}
          render={() => (
            <div className={styles.innerWrapper}>
              <h1>Please login in order to see characters</h1>
              <h3>{errorMessage}</h3>
              <form className={styles.form}>
                <label htmlFor="email">Enter your email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="email"
                  autoComplete="off"
                />
                <label htmlFor="password">Enter your password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="password"
                  autoComplete="off"
                />
                <button
                  className="button-1"
                  type="submit"
                  onClick={onSubmit}
                  disabled={!user.email || !user.password}
                >
                  Login
                </button>
              </form>
              <button
                className="button-1"
                type="button"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
