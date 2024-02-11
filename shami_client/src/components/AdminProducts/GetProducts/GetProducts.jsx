import styles from "./getProducts.module.css";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const GetProducts = () => {
  // const [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false)
  const {products, setProduct}= useAuth()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axios.get("/products", {
          signal: controller.signal,
        });
        isMounted && setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleUpdate = (id) => {
    const productToUpdate = products.find(product => product._id === id);
    setUpdatedProduct(productToUpdate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`products/${updatedProduct._id}`, updatedProduct);
      // Actualizar la lista de productos después de la actualización
      const response = await axios.get("/products");
      setProduct(response.data);
      setUpdatedProduct(null); // Limpiar el estado de actualización después de guardar
      console.log(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setUpdatedProduct(null); // Limpiar el estado de actualización sin guardar cambios
  };

  const handleDelete = async (id) => {
    setDeleteBtn(!deleteBtn); // Considera si realmente necesitas deleteBtn en tu estado local
  
    try {
      // Realizar la solicitud de eliminación al servidor
      await axios.delete(`/products/${id}`);
  
      // Actualizar la lista de productos localmente eliminando el producto borrado
      setProduct(prevProducts => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.GetProducts}>
      {products.map((product, i) => (
        <div
          key={product._id}
          className={`${styles.product} ${i % 2 === 0 ? styles.lineColor : ""}`}
        >
          {updatedProduct && updatedProduct._id === product._id ? (
            // Renderizar campos de entrada si el producto está siendo actualizado
            <>
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
                className={styles.updateProdInput}
              />
              <input
                type="text"
                name="storageCapacity"
                value={updatedProduct.storageCapacity}
                onChange={handleChange}
                className={styles.updateProdInput}
              />
              <div className={styles.buttons}>
                <button className={`${styles.buttoncheck} ${styles.save}`} onClick={handleSave}>
                <FaCheckCircle />
                </button>
                <button className={`${styles.buttoncancel} ${styles.cancel}`} onClick={handleCancel}>
                <MdCancel />
                </button>
              </div>
            </>
          ) : (
            // Mostrar el producto normal si no está siendo actualizado
            <>
              <p>{product.name}</p>
              <p>{product.storageCapacity}</p>
              <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.update}`} onClick={() => handleUpdate(product._id)}>
                  <MdDriveFileRenameOutline />
                </button>
                <button className={`${styles.button} ${styles.delete}`} onClick={()=> handleDelete(product._id)}>
                  <RiDeleteBinLine />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default GetProducts;