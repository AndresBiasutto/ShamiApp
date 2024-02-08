import axios from "../../../api/axios";
import styles from "./CreateProduct.module.css"
import { useState, useEffect } from "react";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImgURL, setProductImgURL] = useState("");
  const [productStorageCapacity, setProductStorageCapacity] = useState("");

  const [categories, setCategories] = useState([])

  useEffect( () => {
    const fetchCategories= async ()=>{
    try {
      const response =await axios.get("productcategory");
      setCategories(response.data)
    } catch (error) {
      console.log(error);
    }      
    }

  fetchCategories()

  }, [])

  const formReady=()=>{
    if ( productName !== "" && productCategory !== "" && productStorageCapacity !== "" ) {
      return true
    }
    return false
  }

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name: productName,
        category: productCategory,
        price: productPrice,
        imgURL: productImgURL,
        storageCapacity: productStorageCapacity,
      };
      console.log(newProduct);
      const response = await axios.post("products", newProduct, {
        headers: { "Content-Type": "application/json" },
        credentials: "true",
      });

      console.log("Product created:", response.data);
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  return (
    <section className={styles.createProduct}>
      <form onSubmit={(e) => handleSend(e)}>
        <div>
          <label htmlFor="productName">Nombre del producto</label>
          <input
            id="productName"
            name="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productStorageCapacity">
            Capacidad de almacenamiento
          </label>
          <input
            id="productStorageCapacity"
            name="productStorageCapacity"
            type="text"
            value={productStorageCapacity}
            onChange={(e) => setProductStorageCapacity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productCategory">Categoría del producto</label>
          <select
            id="productCategory"
            name="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
          {categories.map((category)=> {
           return (<option key={category._id} value={category._id}>{category.name}</option>)
             })}
          </select>
        </div>
        <div>
          <label htmlFor="productPrice">Precio del producto</label>
          <input
            id="productPrice"
            name="productPrice"
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productImgURL">URL de la imagen</label>
          <input
            id="productImgURL"
            name="productImgURL"
            type="text"
            value={productImgURL}
            onChange={(e) => setProductImgURL(e.target.value)}
          />
        </div>
        <button className={`${formReady() ? styles.enabled : styles.disabled}`} type="submit" disabled={!formReady()} >Guardar producto</button>
      </form>
    </section>
  );
};

export default CreateProduct;
