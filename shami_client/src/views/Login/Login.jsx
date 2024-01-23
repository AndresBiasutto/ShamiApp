import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./Login.module.css"
import logo from "../../assets/logo_completo.png"

const LOGIN_URL = "/auth/signin";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          credentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      const token = response?.data?.token;
      const roles = response?.data?.roles;
      const username = response?.data?.username;
      const e_mail = response?.data?.email;
      const store = response?.data?.store?.name;
      setAuth({ e_mail, username, roles, token, store });
      setEmail("");
      setPassword("");
      navigate(from, {replace: true})
    } catch (error) {
      setErrMsg("login failed");
      errRef.current.focus();
    }
  };

  return (
    <section className={styles.login}>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "ofscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <img src={logo} className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className={styles.input}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          className={styles.input}
        />
        <button className={styles.signIn} >Sign in</button>
      </form>
    </section>
  );
};

export default Login;
