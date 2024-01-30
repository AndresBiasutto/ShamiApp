/* eslint-disable react/prop-types */
import styles from "./FactoryDetail.module.css";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";

const FactoryDetail = (props) => {
  const { order } = props;
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const fechaEmision = new Date(order?.createdAt);
  const diasHastaProximoJueves = (4 - fechaEmision?.getDay() + 7) % 7;
  const proximoJueves = new Date(fechaEmision);
  proximoJueves.setDate(fechaEmision?.getDate() + diasHastaProximoJueves);
  const fechaActual = new Date();
  const orderId = order._id;
  const apiUrl = `http://localhost:3001/order/${orderId}`;

  useEffect(() => {
    if (order?.createdAt) {
      const fechaEmision = new Date(order.createdAt);
      if (!isNaN(fechaEmision.getTime())) {
        const diasHastaProximoJueves = (4 - fechaEmision.getDay() + 7) % 7;
        const proximoJueves = new Date(fechaEmision);
        proximoJueves.setDate(fechaEmision.getDate() + diasHastaProximoJueves);
        if (fechaActual < proximoJueves) {
          console.log("Mostrar sección");
        } else {
          console.log("No mostrar sección");
        }
      }
    }
  }, [order]);

  useEffect(() => {
    if (order?.order) {
      // Inicializar el array de estados con `true` para cada elemento en el array de order
      setCheckboxStates(new Array(order.order.length).fill(true));
    }
    console.log(order);
  }, [order]);

  const handleCheckboxChange = (index) => {
    // Crear un nuevo array de estados para evitar la mutación directa del estado
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const handleSubmit = async () => {
    // Filtrar los elementos seleccionados basados en checkboxStates
    const newSelectedItems = order.order.filter((item, index) => checkboxStates[index]);
    setSelectedItems(newSelectedItems);
    const formatedOrder= {...order,
    order: newSelectedItems}
    console.log(order);
    try {
        const response = await axios.put(apiUrl, formatedOrder);
  
        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud PUT:", error);
      }
  };

  return (
    <section className={styles.oc}>
      <form>
        {order?.createdAt && fechaActual < proximoJueves ? (
          <div>
            <p> {order.createdAt} </p>
            <p> {order.store} </p>
            <p> {order._id} </p>

            {order.order &&
              order.order.map((item, index) => (
                <div key={item.id}>
                  <p className={checkboxStates[index] ? "" : styles.disabled}>
                    {item.name} {item.amount} {item.storageCapacity}
                  </p>
                  
                    <input
                      type="checkbox"
                      checked={checkboxStates[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  
                </div>
              ))}
          </div>
        ) : (
          "no hay pedidos"
        )}
        {selectedItems && <p>orden modificada</p>}
        <button type="button" onClick={handleSubmit}>
          modificar
        </button>
      </form>
    </section>
  );
};

export default FactoryDetail;



