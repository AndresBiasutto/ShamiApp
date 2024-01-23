import { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./OrderControl.module.css";
import OrderDetail from "./OrderDetail/OrderDetail";

const OrderControl = () => {
  const [lastOrder, setLastOrder] = useState({});



  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/order");
        const reversedOrders = response.data.slice().reverse();
        setLastOrder(reversedOrders[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
    
  }, []);


  return (
    <section className={styles.oc}>
    <OrderDetail
      order= {lastOrder}
    />
    </section>
  );
};

export default OrderControl;
