import Register from "../../views/Register/Register"
import styles from "./AdminUsers.module.css"
import GetUsers from "./GetUsers/GetUsers"

const AdminUsers = () => {
  return (
    <div className={styles.adminUsers}>
    <Register/>
    <GetUsers/>
    </div>
  )
}

export default AdminUsers