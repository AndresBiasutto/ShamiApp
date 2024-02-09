import { useRef, useState, useEffect } from "react";
import { FaBeer, FaCheck, FaTimes } from "react-icons/fa";
import GoBack from "../../components/GoBack/GoBack";
import styles from "./Register.module.css";
import axios from "../../api/axios";

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
  const [success, seetSuccess] = useState(false);

  const [rolSeleccionado, setRolSeleccionado] = useState("");
  const [localSeleccionado, setLocalSeleccionado] = useState("");
  const [stores, setStores] = useState([])

  useEffect(() => {
    const fetchStores=async ()=>{
      try {
        const response=await axios.get("/store")
        setStores(response.data)
      } catch (error) {
        console.log(error);
      }
    }
  fetchStores()

  console.log(stores);

  }, [])
  
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
    console.log(result);
    console.log(userName);
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
        store: localSeleccionado
      };
      console.log(JSON.stringify(newUser));
      const response = await axios.post(REGISTER_URL, JSON.stringify(newUser), {
        headers: { "Content-Type": "application/json" },
        credentials: "true",
      });

      console.log(response.data);
      console.log(response);
      seetSuccess(true);
      //Acá limpiar los imputs
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
      {success ? (
        <section>
          <h2>{`el usuario ${userName} fue agregado correctamente`}</h2>
          <p>
            <GoBack />
          </p>
        </section>
      ) : (
        <section className={styles.register}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "ofscreen"}
            aria-live="assertive"
          >
            {errMsg}{" "}
          </p>
          <FaBeer />

          <h2>Agregar nuevo usuario</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.labelInput}>
              <label htmlFor="username">User Name</label>
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
                  userNameFocus && !validUserName ? "instructions" : "offscreen"
                }
              >
                El nombre debe contener al menos 6 letras y ningun signo de
                puntuación o espacio.
              </p>
            </div>

            <div className={styles.labelInput}>
              <label htmlFor="email">email</label>
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
                <option value="admin">Admin</option>
                <option value="factory">Factory</option>
                <option value="manager">Manager</option>
              </select>
              {/* <p>Rol seleccionado: {rolSeleccionado}</p> */}
            </div>
            <div className={styles.labelInput}>
              <label>Selecciona un local:</label>
              <select
              className={styles.select}
                value={localSeleccionado}
                onChange={(e) => setLocalSeleccionado(e.target.value)}
              >
                <option value="">Selecciona un local</option>
                {stores.map((store)=>{
                  return (
                    <option key={store.id} value={store._id}>{store.name} </option>
                  )
                })}
                
                <option value="65971be06898691942bc07bd">Unicenter Martinez</option>
              </select>
              {/* <p>Rol seleccionado: {localSeleccionado}</p> */}
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
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                Al menos 8 caracteres. Al menos uno numérico. Al menos una
                minúscula. Al menos una mayúscula.
              </p>
            </div>

            <div className={styles.labelInput}>
              <label htmlFor="confirm_password">confirm password</label>
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
                  className={validMatch || !matchPassword ? "hide" : "invalid"}
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

            <button className={styles.signup} disabled={!validEmail || !validPassword || !validMatch}>
              sign up
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
