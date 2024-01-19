import { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./OrderControl.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const OrderControl = () => {
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
  const deleteOrder = () => {
    console.log("borrar");
  };

  return (
    <section className={styles.oc}>
      {orders &&
        orders?.map((order, index) => (
          <div key={order._id}>
            <p> {order.createdAt} </p>
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
            <button onClick={deleteOrder}>borrar orden</button>
          </div>
        ))}
    </section>
  );
};

export default OrderControl;
