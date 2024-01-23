import { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./AdminOrderControl.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminOrderControl = () => {
    const [orders, setOrders] = useState([]);
  const {setOrderState}= useAuth();


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
  const sendOrderState=( order)=>{
      setOrderState(order)
  }

  return (
    <section className={styles.oc}>
      {orders &&
        orders?.map((order, index) => (
          <div key={order._id}>
            <p> {order.createdAt} </p>
            <p> {order.store} </p>
            {order.order.map((item, index) => (
              <div key={index}>
                <p> </p>
                <p>
                  {item.name}: {item.amount} ({item.storageCapacity})
                </p>
              </div>
            ))}
            {index === 0 && orders.length > 1 && (
              <Link onClick={sendOrderState( order)} to={`orderupdate`}>modificar order</Link>
            )}
          </div>
        ))}
    </section>
  );
}

export default AdminOrderControl