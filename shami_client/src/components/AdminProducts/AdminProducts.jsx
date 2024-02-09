
import styles from "./AdminProducts.module.css"
import CreateProduct from "./CreateProduct/CreateProduct";
import GetProducts from "./GetProducts/GetProducts";

const AdminProducts = () => {
  return (
    <section className={styles.AdminProducts}>
    <CreateProduct/>
    <GetProducts/>
    </section>
  )
}

export default AdminProducts