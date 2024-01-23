import logo from "../../assets/logo_completo.png";
import { BsGear } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import useAuth from "../../hooks/useAuth";
import styles from "./Header.module.css";
import GoBack from "../GoBack/GoBack";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { auth, logOut } = useAuth();
  const role = auth?.roles;
  const name = auth?.username;
  const store= auth?.store;
  const location = useLocation();



  const handleLogout = () => {
    // Llama a la función de logout del contexto de autenticación
    logOut();
  };
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} />
      <div className={styles.info}>
        <p className={styles.p}>nombre: {name} </p>
        {store && <p className={styles.p}>tienda: {store} </p>}
        <p className={styles.p}>Rol: {role} </p>
      </div>
      <div className={styles.buttons}>
        {location.pathname !== "/" && <GoBack />}
        <button className={styles.button}>
          <BsGear className={styles.bsgear} />
        </button>
        <button className={styles.button} onClick={handleLogout}>
          <GoSignOut
            className={styles.bsgear}
            title="Salir de la app"
            logout="true"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
