import { useState } from "react";
import Logo from "../assets/images/logo.png";
import styles from "../styles/Login.module.css";

export interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={Logo} alt="logo" />
      <div>
        <h1>Please login in order to see characters</h1>
        <form className={styles.form}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <button className="button-1" type="submit">
            Login
          </button>
        </form>
      </div>
      <button className="button-1" type="button">
        Register
      </button>
    </div>
  );
};

export default Login;
