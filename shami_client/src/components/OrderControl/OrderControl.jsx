import { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./OrderControl.module.css";
import OrderDetail from "./OrderDetail/OrderDetail";
import useAuth from "../../hooks/useAuth";

const OrderControl = () => {
  const [lastOrder, setLastOrder] = useState({});
  const { auth } = useAuth();
  const userStore = auth.store;
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/order");
        const reversedOrders = response?.data?.slice().reverse();
        const stores = {};
        const filteredData = reversedOrders.filter((item) => {
          if (stores[item.store]) {
            return false;
          } else {
            stores[item.store] = true;
            return true;
          }
        });
        const finalData = filteredData.find((data) => {
          const final = data.store === userStore && data;
          return final;
        });
        setLastOrder(finalData);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  return (
    <section className={styles.oc}>
      <OrderDetail order={lastOrder} />
    </section>
  );
};

export default OrderControl;
