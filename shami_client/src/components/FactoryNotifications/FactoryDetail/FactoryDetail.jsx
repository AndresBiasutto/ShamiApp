/* eslint-disable react/prop-types */
import styles from "./FactoryDetail.module.css";
import logo from "../../../assets/logo_completo.png";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import formatDate from "../../../utils/formatDate";

const FactoryDetail = (props) => {
  const { orders } = props;
  const [orderState, setOrderState] = useState([]);
  const { setNotifications } = useAuth();
  const fechaEmision = new Date(orders?.createdAt);
  const diasHastaProximoJueves = (4 - fechaEmision?.getDay() + 7) % 7;
  const proximoJueves = new Date(fechaEmision);
  proximoJueves.setDate(fechaEmision?.getDate() + diasHastaProximoJueves);
  const fechaActual = new Date();
  let showNoOrders = false;

  useEffect(() => {
    setOrderState(orders);
  }, [orders]);

  useEffect(() => {
    let ordersDelivered = 0;
    orderState.forEach((order) => {
      if (!order.orderDelivered) {
        ordersDelivered += 1;
      }
    });
    setNotifications(ordersDelivered);
  }, [orderState, setNotifications]);

  useEffect(() => {
    orderState.forEach((order) => {
      if (order?.createdAt) {
        const fechaEmision = new Date(order.createdAt);
        const diasHastaProximoJueves = (4 - fechaEmision.getDay() + 7) % 7;
        const proximoJueves = new Date(fechaEmision);
        proximoJueves.setDate(fechaEmision.getDate() + diasHastaProximoJueves);

        if (fechaActual < proximoJueves) {
          console.log("Mostrar sección");
        } else {
          console.log("No mostrar sección");
          showNoOrders = true; // Establece la bandera en true
        }
        console.log(fechaEmision);
      }
    });
  }, [orderState, fechaActual]);

  const handleChange = (orderId, itemName) => {
    const updatedOrders = orderState.map((order) => {
      if (order._id === orderId) {
        const updatedOrder = {
          ...order,
          order: order.order.map((item) => {
            if (item.name === itemName) {
              return {
                ...item,
                inStock: !item.inStock, // Cambiar el estado inStock al contrario del estado actual
              };
            }
            return item;
          }),
        };
        return updatedOrder;
      }
      return order;
    });
    setOrderState(updatedOrders);
    console.log(updatedOrders);
  };
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const orderId = id;
    const apiUrl = `http://localhost:3001/order/${orderId}`;

    const theOrder = orderState.find((order) => {
      if (orderId === order._id) {
        return order;
      }
    });
    try {
      await axios.put(apiUrl, theOrder);

      console.log("Respuesta del servidor:", theOrder);
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  };
  const handleOrderDelivered = async (e, id, delivered) => {
    e.preventDefault();
    const orderId = id;
    const apiUrl = `http://localhost:3001/order/${orderId}`;

    // Encuentra el índice del pedido en orderState
    const orderIndex = orderState.findIndex((order) => order._id === orderId);

    if (orderIndex !== -1) {
      // Crea una copia del pedido en orderState
      const updatedOrder = { ...orderState[orderIndex] };
      // Actualiza el estado orderDelivered
      updatedOrder.orderDelivered = !delivered;

      // Crea una copia de orderState y actualiza el pedido modificado
      const updatedOrders = [...orderState];
      updatedOrders[orderIndex] = updatedOrder;

      try {
        // Realiza la solicitud PUT con el pedido modificado
        await axios.put(apiUrl, updatedOrder);
        // Actualiza el estado orderState con los pedidos actualizados
        setOrderState(updatedOrders);
        console.log("Respuesta del servidor:", updatedOrder);
      } catch (error) {
        console.error("Error al realizar la solicitud PUT:", error);
      }
    }
  };

  return (
    <section className={styles.oc}>
      <div className={styles.oc}>
        {showNoOrders ? (
          <p>Sin pedidos</p>
        ) : (
          orderState.map((order) => (
            <div className={styles.order} key={order._id}>
              <div className={styles.orderHeader}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <div className={styles.info}>
                  <p className={styles.pInfo}>{order._id}</p>
                  <p className={styles.pInfo}>{formatDate(order.createdAt) }</p>
                  <p className={styles.pInfo}>{order.store}</p>
                </div>
              </div>
              <form>
                {order.order.map((item, i) => (
                  <div
                    className={`${styles.item} ${
                      item.inStock ? "" : styles.disabled
                    }`}
                    key={i}
                  >
                    <p className={styles.p}>{item.name}</p>
                    <div className={styles.itemInfo}>
                      <p className={styles.p}>{item.amount}</p>
                      <p className={styles.p}>({item.storageCapacity})</p>

                      <input
                        type="checkbox"
                        checked={item.inStock}
                        onChange={() => handleChange(order._id, item.name)}
                      />
                      <p className={styles.p}>
                        {item.inStock ? "en stock" : "no stock"}
                      </p>
                    </div>
                  </div>
                ))}

                <button onClick={(e) => handleSubmit(e, order._id)}>
                  modificar
                </button>
              </form>
              <button
                onClick={(e) =>
                  handleOrderDelivered(e, order._id, order.orderDelivered)
                }
                className={styles.p}
              >
                {order.orderDelivered ? "pedido en listo" : "pedido en espera"}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FactoryDetail;
