import styles from "./Factory.module.css"
import { Link } from "react-router-dom"

const Factory = () => {
  return (
    <section className={styles.factory}>
    <h2>Factory</h2>
    <nav className={styles.nav}>
      <Link className={styles.button} to="factorynotifications" >Notificaciones</Link>
      <Link className={styles.button} to="users" >Controlar pedidos</Link>
    </nav>
  </section>
  )
}

export default Factory