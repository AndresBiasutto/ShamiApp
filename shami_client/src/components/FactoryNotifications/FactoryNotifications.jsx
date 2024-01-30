import FactoryDetail from "./FactoryDetail/FactoryDetail";
import { useEffect, useState } from "react"
import axios from "../../api/axios"
const FactoryNotifications = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/order");
        const reversedOrders = response.data.slice().reverse();
        const stores = {};
        const filteredData = reversedOrders.filter((item) => {
          if (stores[item.store]) {
            return false;
          } else {
            stores[item.store] = true;
            return true;
          }
        }); 
        setOrder(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
    
  }, []);
  return (
    <div>
          <FactoryDetail
      order= {order}
    />
    </div>
  )
}

export default FactoryNotifications