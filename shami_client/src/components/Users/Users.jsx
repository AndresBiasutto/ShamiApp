import { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import GoBack from "../GoBack/GoBack.jsx";
import styles from "./Users.module.css"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";


const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/user", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section className={styles.users}>
      <h2>Users List</h2>
      {users?.length ? (
        <ul className={styles.ul}>
          {users.map((user, i) => (
            <li key={i} className={styles.li} >
              <div className={styles.card} >
                <h3 className={styles.h3} >{user?.username}</h3>
                <p className={styles.p} >email: {user?.email}</p>
                <p className={styles.p} >rol: {user?.roles[0]?.name}</p>
                <p className={styles.p} >local: {user?.store?.name}</p>
                <div className={styles.buttonPannel} >
                  <button className={styles.update} ><MdDriveFileRenameOutline /></button>
                  <button className={styles.delete} ><RiDeleteBinLine /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>no users found</p>
      )}
      <GoBack />
    </section>
  );
};

export default Users;
