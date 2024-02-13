import styles from "./GetUsers.module.css";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import logo from "../../../assets/logo_completo.png";

const GetUsers = () => {
  const [updatedUser, setUpdatedUser] = useState(null);
  const { users, setUsers } = useAuth();
  const [stores, setStores] = useState([]);
  const [roles, setRoles] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/role");
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("/store");
        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
  }, []);
  useEffect(() => {}, []);

  const handleUpdate = (id) => {
    const UserToUpdate = users.find((user) => user._id === id);
    setUpdatedUser(UserToUpdate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`user/${updatedUser._id}`, updatedUser);
      // Actualizar la lista de productos después de la actualización
      const response = await axios.get("/user");
      console.log(response.data);
      setUsers(response.data);
      setUpdatedUser(null); // Limpiar el estado de actualización después de guardar
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setUpdatedUser(null); // Limpiar el estado de actualización sin guardar cambios
  };

  const handleDelete = async (id) => {
    try {
      // Realizar la solicitud de eliminación al servidor
      await axios.delete(`/user/${id}`);

      // Actualizar la lista de productos localmente eliminando el producto borrado
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.GetProducts}>
      <div className={styles.usersHeader}>
        <p className={styles.pheader}>foto</p>
        <p className={styles.pheader}>nombre</p>
        <p className={styles.pheader}>rol</p>
        <p className={styles.pheader}>e-mail</p>
        <p className={styles.pheader}>local</p>
        <p className={styles.pheader}>actions</p>
      </div>
      {users.map((user, i) => (
        <div
          key={user._id}
          className={`${styles.user} ${i % 2 === 0 ? styles.lineColor : ""}`}
        >
          {updatedUser && updatedUser._id === user._id ? (
            // Renderizar campos de entrada si el producto está siendo actualizado
            <>
              <div className={styles.photoDiv}>
                <img
                  className={styles.photo}
                  src={user?.photo ? user.photo : logo}
                />
              </div>
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
                className={styles.updateProdInput}
              />
              <div className={styles.labelInput}>
                <select
                  className={styles.updateProdInput}
                  value={updatedUser.roles._id}
                  onChange={handleChange}
                  name="roles"
                >
                  {roles.map((role) => {
                    return (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <input
                type="text"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className={styles.updateProdInput}
              />
              <div className={styles.labelInput}>
                <select
                  className={styles.updateProdInput}
                  value={updatedUser.store._id}
                  onChange={handleChange}
                  name="store"
                >
                  {stores.map((store) => {
                    return (
                      <option key={store.id} value={store._id}>
                        {store.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={styles.buttons}>
                <button
                  className={`${styles.buttoncheck} ${styles.save}`}
                  onClick={handleSave}
                >
                  <FaCheckCircle />
                </button>
                <button
                  className={`${styles.buttoncancel} ${styles.cancel}`}
                  onClick={handleCancel}
                >
                  <MdCancel />
                </button>
              </div>
            </>
          ) : (
            // Mostrar el producto normal si no está siendo actualizado

            <>
              <div className={styles.photoDiv}>
                <img
                  className={styles.photo}
                  src={user?.photo ? user.photo : logo}
                />
              </div>
              <p className={styles.p}>{user.username}</p>
              <p className={styles.p}>{user.roles.name}</p>
              <p className={styles.p}>{user.email}</p>
              <p className={styles.p}>{user.store.name}</p>

              <div className={styles.buttons}>
                <button
                  className={`${styles.button} ${styles.update}`}
                  onClick={() => handleUpdate(user._id)}
                >
                  <MdDriveFileRenameOutline />
                </button>
                <button
                  className={`${styles.button} ${styles.delete}`}
                  onClick={() => handleDelete(user._id)}
                >
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

export default GetUsers;
