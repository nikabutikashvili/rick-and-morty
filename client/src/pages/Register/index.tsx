import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderWithApi from "../../components/LoaderWithApi";
import { api } from "../../configs/api";
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
      .catch(({ message }) => {
        setErrorMessage(message);
        setLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h1>Register</h1>
      <LoaderWithApi
        load={loading}
        render={() => (
          <form className={styles.formWrapper}>
            <label htmlFor="email">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={newUser.firstName}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
            />
            <label htmlFor="email">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={newUser.lastName}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={newUser.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <button type="submit" className="button-1" onClick={onSubmit}>
              Register
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Register;
