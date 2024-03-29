import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes , FaUserPlus} from "react-icons/fa";
import {  } from 'react-icons/fa';
import styles from "./Register.module.css";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const REGISTER_URL = "/auth/signup";
const EMAIL_REGEX = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const USER_NAME_REGEX = /^[a-zA-Z]{6,}$/;

const Register = () => {
  const nameRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrorMsg] = useState("");

  const [rolSeleccionado, setRolSeleccionado] = useState("");
  const [localSeleccionado, setLocalSeleccionado] = useState("");
  const [stores, setStores] = useState([]);
  const { setUsers } = useAuth();

  const [showModal, setsSowModal] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("/store");
        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
  }, []);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/role");
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    nameRef.current.focus();
    nameRef.current;
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_NAME_REGEX.test(userName);
    setValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password, matchPassword]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/user");
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMsg("invalid entry");
      return;
    }
    try {
      const newUser = {
        username: userName,
        email: email,
        password: password,
        roles: rolSeleccionado,
        store: localSeleccionado,
      };
      console.log(JSON.stringify(newUser));
      const response = await axios.post(REGISTER_URL, JSON.stringify(newUser), {
        headers: { "Content-Type": "application/json" },
        credentials: "true",
      });

      console.log(response.data);
      console.log(response);
      fetchUsers();
      //Acá limpiar los imputs
      setsSowModal(!showModal)
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No hay respuesta del servidor");
      } else if (error.response?.status === 409) {
        setErrorMsg("Email ya existente");
      } else {
        setErrorMsg("Registro fallido");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {(
        <section className={`${styles.register} ${showModal? styles.modaltrue : styles.modalfalse}`}>
          <div className={styles.formContainer}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "ofscreen"}
              aria-live="assertive"
            >
              {errMsg}{" "}
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.labelInput}>
                <label htmlFor="username">Nombre</label>
                <input
                  className={styles.input}
                  type="text"
                  id="username"
                  ref={nameRef}
                  autoComplete="on"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  aria-invalid={validUserName ? "false" : "true"}
                  aria-describedby="namenote"
                  onFocus={() => setUserNameFocus(true)}
                  onBlur={() => setUserNameFocus(false)}
                />
              </div>
              <div className={styles.infoHelp}>
                <div>
                  <span className={validUserName ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span
                    className={validUserName || !userName ? "hide" : "invalid"}
                  >
                    <FaTimes />
                  </span>
                </div>
                <p
                  id="namenote"
                  className={
                    userNameFocus && !validUserName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  El nombre debe contener al menos 6 letras y ningun signo de
                  puntuación o espacio.
                </p>
              </div>

              <div className={styles.labelInput}>
                <label htmlFor="email">E-mail</label>
                <input
                  className={styles.input}
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </div>
              <div className={styles.infoHelp}>
                <div>
                  <span className={validEmail ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </div>
                <p
                  id="uidnote"
                  className={
                    userFocus && !validEmail ? "instructions" : "offscreen"
                  }
                >
                  Este campo debe contner un email valido
                </p>
              </div>

              <div className={styles.labelInput}>
                <label>Selecciona un rol:</label>
                <select
                  className={styles.select}
                  value={rolSeleccionado}
                  onChange={(e) => setRolSeleccionado(e.target.value)}
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map((role) => {
                    return (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
                {/* <p>Rol seleccionado: {localSeleccionado}</p> */}
              </div>
              <div className={styles.labelInput}>
                <label>Selecciona un local:</label>
                <select
                  className={styles.select}
                  value={localSeleccionado}
                  onChange={(e) => setLocalSeleccionado(e.target.value)}
                >
                  <option value="">Selecciona un local</option>
                  {stores.map((store) => {
                    return (
                      <option key={store.id} value={store._id}>
                        {store.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.labelInput}>
                <label htmlFor="password">password</label>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
              </div>
              <div className={styles.infoHelp}>
                <div>
                  <span className={validPassword ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span
                    className={validPassword || !password ? "hide" : "invalid"}
                  >
                    <FaTimes />
                  </span>
                </div>
                <p
                  id="pwdnote"
                  className={
                    passwordFocus && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  Al menos 8 caracteres. Al menos uno numérico. Al menos una
                  minúscula. Al menos una mayúscula.
                </p>
              </div>

              <div className={styles.labelInput}>
                <label htmlFor="confirm_password">confirmar password</label>
                <input
                  className={styles.input}
                  type="password"
                  id="confirm_password"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </div>
              <div className={styles.infoHelp}>
                <div>
                  <span
                    className={validMatch && matchPassword ? "valid" : "hide"}
                  >
                    <FaCheck />
                  </span>
                  <span
                    className={
                      validMatch || !matchPassword ? "hide" : "invalid"
                    }
                  >
                    <FaTimes />
                  </span>
                </div>
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  los passwords deben coincidir
                </p>
              </div>

              <button
                className={`${styles.signup } ${!validEmail || !validPassword || !validMatch? styles.disabled: ""}`}
                disabled={!validEmail || !validPassword || !validMatch}
              >
                Agregar usuario
              </button>
            </form>
          </div>
          <button onClick={()=> setsSowModal(!showModal)} className={ `${styles.modalButton} ${showModal && styles.modalButtonOn}` } ><FaUserPlus /></button>
        </section>
      )}
    </>
  );
};

export default Register;
