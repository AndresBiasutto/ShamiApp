import styles from "./Factory.module.css";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

const Factory = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/order");
        const reversedOrders = response.data.slice().reverse();
        setOrder(reversedOrders[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
    console.log(order);
  }, []);
  return (
    <section className={styles.factory}>
      <h2 className={styles.h2}>Factory</h2>
      <nav className={styles.nav}>
        <Link className={`link linkFactory`} to="factorynotifications">
          Notificaciones:{" "}
          <span>{order.store && `notificaciones Pendientes`}</span>{" "}
        </Link>
        {/* <Link className={styles.button} to="users" >Controlar pedidos</Link> */}
      </nav>
    </section>
  );
};

export default Factory;
