import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from "./SolicitarPedido.module.css";
import GoBack from "../GoBack/GoBack";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const REGISTER_URL = "/order";

const SolicitarPedido = () => {
  const navigate= useNavigate();
  const [formulario, setFormulario] = useState({});
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSolicitado, setPedidoSolicitado] = useState(false);
  
  const { auth } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = (await axios.get("/products")).data;
        setProducts(response.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };
  const handleEnviarPedido = async () => {
    setShowModal(true);
  };
  

  const goBack= ()=> navigate(-1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPedidoSolicitado(!pedidoSolicitado)

    setTimeout(() => {
      setPedidoSolicitado(pedidoSolicitado)
      setShowModal(!showModal)
      goBack()
    }, 2000);
    const formattedForm = Object.entries(formulario).map(([key, value]) => {
      const product = products.find((p) => p.name === key);

      if (product) {
        return {
          name: key,
          storageCapacity: product.storageCapacity,
          category: product.category.name,
          amount: value,
        };
      }
      return null; // handle the case where the product is not found
    });

    const finalForm = formattedForm.filter((item) => item !== null);
    const final = {
      store: auth.store,
      order: finalForm,
    };

    try {
      await axios.post(REGISTER_URL, final, {
        headers: { "Content-Type": "application/json" },
        credentials: "true",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelarPedido = () => {
    setShowModal(false);
  };
  // Agrupar los productos por categoría
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category ? product.category.name : "Sin categoría"; // Verifica si product.category es null
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const increment = (name) => {
    const currentValue = parseInt(formulario[name] || 0);
    const newValue = currentValue - 1;
    setFormulario({
      ...formulario,
      [name]: newValue >= 0 ? newValue : 0,
    });
  };
  const decrement = (name) => {
    const currentValue = parseInt(formulario[name] || 0);
    const newValue = currentValue + 1;
    setFormulario({
      ...formulario,
      [name]: newValue,
    });
  };
  return (
    <section className={styles.sp}>
      <form onSubmit={(e) => { e.preventDefault(); handleEnviarPedido(); }}>
        {/* Renderizar inputs agrupados por categoría */}
        {Object.entries(groupedProducts).map(([category, products], index) => (
          <div key={index}>
            <h3>{category}</h3>
            {products.map((product, i) => (
              <div key={i} className={`${styles.card} ${i % 2 === 0 ? styles.lineColor : ""}`}>
                <label htmlFor={product.name}>{product.name}:</label>
                <div className={styles.numberInputContainer}>
                  <button
                    type="button"
                    className={styles.numButton}
                    onClick={() => increment(product.name)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    name={product.name}
                    value={formulario[product.name] || 0}
                    onChange={handleInputChange}
                    className={styles.numInput}
                  />
                  <button
                    type="button"
                    className={styles.numButton}
                    onClick={() => decrement(product.name)}
                  >
                    +
                  </button>
                </div>
                <p>{product.storageCapacity}</p>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>

      {showModal && (
        <div className={styles.modal}>
          <h2>¿El pedido está listo?</h2>
          <div className={styles.modalButtons}>
            <button onClick={handleSubmit}><FaCheckCircle className={styles.check} /></button>
            <button onClick={handleCancelarPedido}><MdCancel className={styles.cancel} /></button>
          </div>
        </div>
      )}

      {pedidoSolicitado && (
        <div className={styles.modal}>
          <h2>Pedido solicitado</h2>
          <GoBack />
        </div>
      )}
    </section>
  );
};

export default SolicitarPedido;

