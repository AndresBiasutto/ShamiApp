import { useEffect, useState } from "react";
import logo from "../../assets/logo_completo.png";
import axios from "../../api/axios";
import styles from "./AdminOrderControl.module.css";
import formatDate from "../../utils/formatDate";

const AdminOrderControl = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/order");
        const reversedOrders = response.data.slice().reverse(); // Crear una copia invertida
        setOrders(reversedOrders);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);
useEffect(() => {
  console.log(orders);
}, [orders])

  return (
    <section className={styles.oc}>
      {orders &&
        orders?.map((order) => (
          <div className={styles.order} key={order._id}>
            <div className={styles.orderHeader}>
              <img className={styles.logo} src={logo} />
              <div className={styles.info}>
                <p className={styles.pInfo}>id remito: {order._id} </p>
                <p className={styles.pInfo}>Fecha: {formatDate(order.createdAt)} </p>
                <p className={styles.pInfo}>tienda: {order.store} </p>
              </div>
            </div>

            {order.order.map((item, index) => (
              <div className={styles.item} key={index}>
                <p className={styles.pInfo}>{item.name}</p>
                <div className={styles.itemInfo}>
                  <p className={styles.pInfo}>{item.amount}</p>
                  <p className={styles.pInfo}>({item.storageCapacity})</p>
                </div>
              </div>
            ))}
          </div>
        ))}
    </section>
  );
};

export default AdminOrderControl;
