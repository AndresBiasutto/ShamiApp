import { Link } from "react-router-dom";
import styles from "./AdminProducts.module.css"
import CreateProduct from "./CreateProduct/CreateProduct";

const AdminProducts = () => {
  return (
    <section className={styles.AdminProducts}>
    <CreateProduct/>
    <Link className={`link linkAdmin`} to="createproduct" >Cargar nuevo producto</Link>
    <Link className={`link linkAdmin`} to="modifyproduct" >Modificar producto existente</Link>
    </section>
  )
}

export default AdminProducts