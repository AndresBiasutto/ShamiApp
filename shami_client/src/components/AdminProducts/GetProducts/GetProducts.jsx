import styles from "./getProducts.module.css";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  //const [UpdatedProduct, setUpdatedProduct] = useState({})
  const [ToggleUpdate, setToggleUpdate] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdate=((id)=>{
setToggleUpdate(!ToggleUpdate)
console.log(id);
  })
const back=()=>{
    setToggleUpdate(!ToggleUpdate)
}
  return (
    <section className={styles.GetProducts}>
       { ToggleUpdate? 
       products.map((product, i) => (
        <div
          key={product.id}
          className={`${styles.product} ${i % 2 === 0 ? styles.lineColor : ""}`}
        >
          <p>{product.name}</p>
          <p>{product.storageCapacity}</p>
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.update}`}  onClick={()=> handleUpdate(product._id)}><MdDriveFileRenameOutline/></button>
            <button className={`${styles.button} ${styles.delete}`}><RiDeleteBinLine/></button>
          </div>
        </div>
      ))
      :
      (
        <div
        >
          <p>modificar</p>
          <p>modificar</p>
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.update}`}>borrar</button>
            <button className={`${styles.button} ${styles.delete}`} onClick={()=> back()} >volver</button>
          </div>
        </div>
      )
      }
    </section>
  );
};

export default GetProducts;
