import { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./OrderControl.module.css";

const OrderControl = () => {
  const [pedidos, setPedidos]=useState([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = (await axios.get("/products")).data;

        setPedidos(response);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);
  return (
    <section className={styles.oc}>
    hola
      {console.log(pedidos)}
    </section>
  );
}; 

export default OrderControl;
