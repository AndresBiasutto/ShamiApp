import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const OrderUpdate = () => {
  const { orderState } = useAuth();
  const [updatedOrder, setUpdatedOrder] = useState({});
  const orderId = orderState._id;
  const apiUrl = `http://localhost:3001/order/${orderId}`;

  useEffect(() => {
    setUpdatedOrder(orderState);
  }, [orderState]);

  const handleChange = (e, itemName) => {
    const { value } = e.target;

    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      order: prevOrder.order.map((item) =>
        item.name === itemName ? { ...item, amount: value } : item
      ),
    }));
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await axios.put(apiUrl, updatedOrder);

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  };

  return (
    <div>
      <p>fecha de emisión: {updatedOrder?.createdAt} </p>
      <p>id de orden: {updatedOrder?._id} </p>
      <form>
        {updatedOrder?.order?.map((item) => (
          <div key={item.name}>
            <label htmlFor={item.name}>{item.name} </label>
            <input
              name={item.name}
              type="number"
              placeholder={item.amount}
              onChange={(e) => handleChange(e, item.name)}
              value={item.amount}
            />
            <p>{item.storageCapacity} </p>
            <p>{item.category} </p>
          </div>
        ))}
        <button type="button" onClick={handleUpdateOrder}>
          modificar
        </button>
      </form>
    </div>
  );
};

export default OrderUpdate;

/*
(
    <div>
      <h1>Actualizar Orden</h1>
      {updatedOrder.order.map((item, index) => (
        <div key={index}>
          <label>
            Nombre:
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </label>
          <label>
            Capacidad de Almacenamiento:
            <input
              type="text"
              value={item.storageCapacity}
              onChange={(e) =>
                handleChange(index, "storageCapacity", e.target.value)
              }
            />
          </label>
          <label>
            Categoría:
            <input
              type="text"
              value={item.category}
              onChange={(e) => handleChange(index, "category", e.target.value)}
            />
          </label>
          <label>
            Cantidad:
            <input
              type="text"
              value={item.amount}
              onChange={(e) => handleChange(index, "amount", e.target.value)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleUpdateOrder}>Actualizar Orden</button>
    </div>
  );
*/
