/* eslint-disable react/prop-types */
import styles from "./FactoryDetail.module.css";
import logo from "../../../assets/logo_completo.png";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
// import useAuth from "../../../hooks/useAuth"

const FactoryDetail = (props) => {
  const { orders } = props;
  const [orderState, setOrderState] = useState([]);
  // const {notifications, setNotifications}=useAuth()

  useEffect(() => {
    setOrderState(orders);
  }, [orders]);

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
  const handleSubmit=async (e, id)=>{
    e.preventDefault()
    const orderId = id;
    const apiUrl = `http://localhost:3001/order/${orderId}`;
    let notify= 0
    console.log( "esto ====> " +  notify);
    orderState.map(order=> console.log(order?.orderDelivered))

    const theOrder= orderState.find(order =>{
     if (orderId === order._id ) {
      return order
     } 
    })
         try {
         await axios.put(apiUrl, theOrder);

         console.log("Respuesta del servidor:", theOrder);
       } catch (error) {
         console.error("Error al realizar la solicitud PUT:", error);
       }
  }

  return (
    <section className={styles.oc}>
      <div className={styles.oc}>
        {orderState.map((order) => (
          <div className={styles.order} key={order._id}>
            <div className={styles.orderHeader}>
              <img className={styles.logo} src={logo} alt="Logo" />
              <div className={styles.info}>
                <p className={styles.pInfo}>{order._id}</p>
                <p className={styles.pInfo}>{order.createdAt}</p>
                <p className={styles.pInfo}>{order.store}</p>
              </div>
            </div>
            <form>
              {order.order.map((item, i) => (
                <div className={`${styles.item} ${item.inStock? "": styles.disabled}`} key={i}>
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

              <button onClick={ (e)=> handleSubmit(e, order._id)} >modificar</button>
            </form>
            <p className={styles.p}>
              {order.orderDelivered
                ? "pedido en listo"
                : "pedido en espera"}
            </p>
          </div>
        ))}
        <button onClick={(e)=> handleSubmit(e)} > modificar orden</button>
      </div>
    </section>
  );
};

export default FactoryDetail;

// const { orders } = props;
//   const [checkboxStates, setCheckboxStates] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const fechaEmision = new Date(orders?.createdAt);
//   const diasHastaProximoJueves = (4 - fechaEmision?.getDay() + 7) % 7;
//   const proximoJueves = new Date(fechaEmision);
//   proximoJueves.setDate(fechaEmision?.getDate() + diasHastaProximoJueves);
//   const fechaActual = new Date();
//   const orderId = orders._id;
//   const apiUrl = `http://localhost:3001/order/${orderId}`;

//   useEffect(() => {
//     orders.map((order)=>{
//       if (order?.createdAt) {
//       const fechaEmision = new Date(orders.createdAt);
//       if (!isNaN(fechaEmision.getTime())) {
//         const diasHastaProximoJueves = (4 - fechaEmision.getDay() + 7) % 7;
//         const proximoJueves = new Date(fechaEmision);
//         proximoJueves.setDate(fechaEmision.getDate() + diasHastaProximoJueves);
//         if (fechaActual < proximoJueves) {
//           console.log("Mostrar sección");
//         } else {
//           console.log("No mostrar sección");
//         }
//       }
//     }
//     })

//   }, [orders]);

//   useEffect(() => {
//     if (orders?.order) {
//       // Inicializar el array de estados con `true` para cada elemento en el array de order
//       setCheckboxStates(new Array(orders.order.length).fill(true));
//     }
//     console.log(orders);
//   }, [orders]);

//    const handleCheckboxChange = (index) => {
//      // Crear un nuevo array de estados para evitar la mutación directa del estado
//     const newCheckboxStates = [...checkboxStates];
//     newCheckboxStates[index] = !newCheckboxStates[index];
//     setCheckboxStates(newCheckboxStates);
//   };

//   const handleSubmit = async () => {
//     // Filtrar los elementos seleccionados basados en checkboxStates
//     const newSelectedItems = orders.order.filter((item, index) => checkboxStates[index]);
//     setSelectedItems(newSelectedItems);
//     const formatedOrder= {...orders,
//     order: newSelectedItems}
//     console.log(orders);
//     try {
//         const response = await axios.put(apiUrl, formatedOrder);

//         console.log("Respuesta del servidor:", response.data);
//       } catch (error) {
//         console.error("Error al realizar la solicitud PUT:", error);
//       }
//   };

//   return (
//     <section className={styles.oc}>
//       <form>
//         {orders.map((order)=>{
//           order?.createdAt && fechaActual < proximoJueves ? (
//           <div>
//             <p> {order.createdAt} </p>
//             <p> {order.store} </p>
//             <p> {order._id} </p>

//             {order.order &&
//               order.order.map((item, index) => (
//                 <div key={item.id}>
//                   <p className={checkboxStates[index] ? "" : styles.disabled}>
//                     {item.name} {item.amount} {item.storageCapacity}
//                   </p>

//                     <input
//                       type="checkbox"
//                       checked={checkboxStates[index]}
//                       onChange={() => handleCheckboxChange(index)}
//                     />

//                 </div>
//               ))}
//           </div>
//         ) : (
//           "no hay pedidos"
//         )
//         }) }
//         {selectedItems && <p>orden modificada</p>}
//         <button type="button" onClick={handleSubmit}>
//           modificar
//         </button>
//       </form>
//     </section>
//   );
