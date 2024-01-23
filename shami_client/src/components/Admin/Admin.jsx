// import Users from "../Users/Users";
import styles from "./Admin.module.css"
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className={styles.admin}>
      <h2>Admin</h2>
      <nav className={styles.nav}>
        <Link className={styles.button} to="register" >Agregar usuario</Link>
        <Link className={styles.button} to="users" >Lista de usuarios</Link>
        <Link className={styles.button} to="adminordercontrol" >Historial de Pedidos</Link>
      </nav>
    </section>
  );
};

export default Admin;
