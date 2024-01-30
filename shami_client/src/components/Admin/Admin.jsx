// import Users from "../Users/Users";
import styles from "./Admin.module.css"
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className={styles.admin}>
      <h2 className={styles.h2}>Admin control pannel</h2>
      <nav className={`${styles.nav} startMenu`  }>
        <Link className={`link linkAdmin`} to="register" >Agregar usuario</Link>
        <Link className={`link linkAdmin`} to="users" >Lista de usuarios</Link>
        <Link className={`link linkAdmin`} to="adminordercontrol" >Historial de Pedidos</Link>
      </nav>
    </section>
  );
};

export default Admin;
