import { useEffect, useState } from "react";
import axios from "../../api/axios";
import FactoryDetail from "./FactoryDetail/FactoryDetail";
import filterUniqueStores from "../../utils/factoryStores";

const FactoryNotifications = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order");
        const reversedOrders = response.data.slice().reverse();
        const uniqueStores = filterUniqueStores(reversedOrders);
        setOrders(uniqueStores);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);



  return (
    <div>
      <FactoryDetail orders={orders} />
    </div>
  );
};

export default FactoryNotifications;