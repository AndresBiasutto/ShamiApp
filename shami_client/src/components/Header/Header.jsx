import logo from "../../assets/logo_completo.png";
import { BsGear } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import useAuth from "../../hooks/useAuth";
import styles from "./Header.module.css";
import GoBack from "../GoBack/GoBack";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Header = () => {
  const { auth, logOut } = useAuth();
  const role = auth?.roles;
  const name = auth?.username;
  const store = auth?.store;
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(auth);
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user");
        console.log(response.data);

        // Buscar el usuario después de que se hayan cargado los datos de los usuarios
        const userData = response?.data?.find(
          (user) => user.email === auth.e_mail
        );
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [auth.e_mail]);

  const handleLogout = () => {
    // Llama a la función de logout del contexto de autenticación
    logOut();
  };

  const handleToggle = () => {
    setToggle(!toggle);
    console.log(user);
  };

  return (
    <header
      className={`${styles.header} ${
        role === "admin"
          ? styles.admin
          : role === "factory"
          ? styles.factory
          : styles.manager
      }`}
    >
      <img className={styles.logo} src={logo} />

      <div className={styles.buttons}>
        {location.pathname !== "/" && <GoBack />}
        <button onClick={handleToggle} className={styles.button}>
          {user.photo ? (
            <img className={styles.userImg} src={user.photo} />
          ) : (
            <BsGear className={styles.bsgear} />
          )}
        </button>

        <div
          className={`${styles.modal} ${toggle ? styles.show : styles.hide}`}
        >
          <div className={styles.info}>
            <p className={styles.p}>nombre: {name} </p>
            {store && <p className={styles.p}>tienda: {store.name} </p>}
            <p className={styles.p}>Rol: {role} </p>
          </div>
          <div className={styles.menuButtons}>
            <Link to="usersettings" className={styles.button}>
              <BsGear className={styles.bsgear} /> settings
            </Link>
            <button className={styles.button} onClick={handleLogout}>
              <GoSignOut
                className={styles.bsout}
                title="Salir de la app"
                logout="true"
              />
              Salir
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
