/* eslint-disable react/prop-types */
import styles from "./OrderDetail.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const OrderDetail = (props) => {
  const { order } = props;
  const { setOrderState } = useAuth();
  const fechaEmision = new Date(order?.createdAt);
  const diasHastaProximoJueves = (4 - fechaEmision?.getDay() + 7) % 7;
  const proximoJueves = new Date(fechaEmision);
  proximoJueves.setDate(fechaEmision?.getDate() + diasHastaProximoJueves);
  const [fechaActual, setFechaActual] = useState(new Date()); // Usa useState para fechaActual

  useEffect(() => {
    const fechaEmision = new Date(order?.createdAt);
    if (!isNaN(fechaEmision.getTime())) {
      const diasHastaProximoJueves = (4 - fechaEmision.getDay() + 7) % 7;
      const proximoJueves = new Date(fechaEmision);
      proximoJueves.setDate(fechaEmision.getDate() + diasHastaProximoJueves);
      setFechaActual(new Date()); // Actualiza la fecha actual al renderizar
      if (fechaActual > proximoJueves) {
        console.log("Mostrar sección");
      } else {
        console.log("No mostrar sección");
      }
    }
    console.log(`$fecha actual ${fechaActual} proximo jueves ${proximoJueves}`);
  }, [order?.createdAt]); // Añade order.createdAt como dependencia

  const sendOrder = () => {
    setOrderState(order);
  };

  return (
    <section className={styles.oc}>
      {order?.createdAt && fechaActual < proximoJueves ? (
        <div>
          <p> {order.createdAt} </p>
          <p> {order.store} </p>
          <p> {order._id} </p>
          {order.order &&
            order.order.map((item) => (
              <div key={item._id}>
                <p>
                  {item.name} {item.amount} {item.storageCapacity}
                </p>
              </div>
            ))}
          <Link onClick={sendOrder} to={`orderupdate`}>
            modificar order
          </Link>
        </div>
      ) : (
        <p>no hay pedidos</p>
      )}
    </section>
  );
};

export default OrderDetail;
