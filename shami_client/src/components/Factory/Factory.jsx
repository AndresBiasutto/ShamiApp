import styles from "./Factory.module.css"
import { Link } from "react-router-dom"
import axios from "../../api/axios";
import { useEffect, useState } from "react";

const Factory = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = (await axios.get("/order")).data;
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);
  return (
    <section className={styles.factory}>
    <h2>Factory</h2>
    <nav className={styles.nav}>
      <Link className={styles.button} to="factorynotifications" >Notificaciones:  <span>{orders.length > 0 && orders.length}</span>  </Link>
      {/* <Link className={styles.button} to="users" >Controlar pedidos</Link> */}
    </nav>
  </section>
  )
}

export default Factory