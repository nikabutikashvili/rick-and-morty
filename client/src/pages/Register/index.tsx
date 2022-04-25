import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderWithApi from "../../components/LoaderWithApi";
import { api } from "../../configs/api";
import useAuth from "../../hooks/useAuth";
import styles from "./Register.module.css";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<NewUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const onSubmit = (event: any): void => {
    event.preventDefault();
    setLoading(true);
    api
      .post("/auth/sign-up", newUser)
      .then(() => navigate("/login"))
      .catch(({ response }) => {
        setErrorMessage(response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <button className="button-1" onClick={() => navigate("/login")}>
        Go back to login page
      </button>
      <h1>Register to use the APP</h1>
      <p className={styles.errorMessage}>{errorMessage}</p>
      <LoaderWithApi
        load={loading}
        render={() => (
          <form className={styles.formWrapper}>
            <label htmlFor="email">Enter your first name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={newUser.firstName}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
              placeholder="First Name"
              required
            />
            <label htmlFor="email">Enter your last name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={newUser.lastName}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Last Name"
              required
            />
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Email"
              required
            />
            <label htmlFor="password">Enter your password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="button-1"
              onClick={onSubmit}
              disabled={
                !newUser.firstName ||
                !newUser.lastName ||
                !newUser.email ||
                !newUser.password
              }
            >
              Register
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Register;
