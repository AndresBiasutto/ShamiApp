import styles from "./SolicitarPedido.module.css";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
const REGISTER_URL = "/order";

const SolicitarPedido = () => {
  const [category, setCategory] = useState("");
  const [formulario, setFormulario] = useState({});
  const [products, setProducts] = useState([]);
  const {auth}= useAuth()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = (await axios.get("/products")).data;

        setProducts(response);
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormulario({
      ...formulario,
    });
    const formatedForm = Object.entries(formulario).map(([key, value]) => {
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
    const finalForm = formatedForm.filter((item) => item !== null);
    const final= {
      store: auth.store,
      order: finalForm
    }

    try {
       await axios.post(REGISTER_URL, final, {
        headers: { "Content-Type": "application/json" },
        credentials: "true",
      });

    } catch (error) {
      console.log(error);
    }
  };
  const filteredProducts = category
    ? products.filter((product) => product.category.name === category)
    : products;

  return (
    <section className={styles.sp}>
      <label htmlFor="category"></label>
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">selecciona una categoria</option>
        <option value="shawarma">Carne Shawarma</option>
        <option value="cremas">cremas</option>
        <option value="empanadas">empanadas</option>
        <option value="postres">postres</option>
        <option value="descartables">descartables</option>
        <option value="salsas">salsas</option>
        <option value="semillasyfiambres">semillas y fiambres</option>
        <option value="varios">varios</option>
      </select>

      <form onSubmit={handleSubmit}>
        {category !== "" &&
          filteredProducts.map((product, i) => {
            return (
              <div key={i} className={styles.card}>
                <label htmlFor={product.name}>{product.name}:</label>
                <input
                  type="number"
                  name={product.name}
                  min={0}
                  value={formulario[product.name]}
                  onChange={handleInputChange}
                />
                <p>{product.storageCapacity}</p>
              </div>
            );
          })}

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default SolicitarPedido;
