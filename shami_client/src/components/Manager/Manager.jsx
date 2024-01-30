import styles from "./Manager.module.css";
import { Link } from "react-router-dom";

const Manager = () => {
  return (
    <section className={styles.manager}>
    <h2 className={styles.h2}>Manager</h2>
    <nav className={styles.nav}>
      {/* <Link className={styles.button} to="factorynotifications" >Controlar stock</Link> */}
      <Link className={`link linkManager`} to="solicitarpedido" >Solicitar pedido</Link>
      <Link className={`link linkManager`} to="ordercontrol" >Controlar Pedido</Link>
      {/* <Link className={styles.button} to="users" >Ventas de hoy</Link>
      <Link className={styles.button} to="users" >Merma de hoy</Link> */}
    </nav>
  </section>
  )
}

export default Manager