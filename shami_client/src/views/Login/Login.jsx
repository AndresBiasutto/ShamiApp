import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./Login.module.css";
import logo from "../../assets/logo_completo.png";

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
  const [loginSuccess, setLoginSuccess] = useState(false); 

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

      const token = response?.data?.token;
      const roles = response?.data?.roles;
      const username = response?.data?.username;
      const e_mail = response?.data?.email;
      const store = response?.data?.store?.name;
      setAuth({ e_mail, username, roles, token, store });
      setEmail("");
      setPassword("");
      setLoginSuccess(true); // Marcar el inicio de sesión como exitoso
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000); 
    } catch (error) {
      setErrMsg("login failed");
      errRef.current.focus();
      setLoginSuccess(false); 
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

      <form className={`${styles.form} ${loginSuccess ? styles.goUp : styles.goDown}`} onSubmit={handleSubmit}>
        <img src={logo} className={styles.logo} />
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
          className={ styles.input}
        />
        <button className={styles.signIn}>Ingresar</button>
      </form>
    </section>
  );
};

export default Login;
