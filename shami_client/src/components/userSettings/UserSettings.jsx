import styles from "./UserSettings.module.css";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth"
import axios from "../../api/axios";


const UserSettings = () => {
  const [Image, setImage] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [User, setUser] = useState([])
  const [userData, setuserData] = useState({})
  const { auth } = useAuth();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("user");
        console.log(response.data);

        // Buscar el usuario después de que se hayan cargado los datos de los usuarios
        const user = response.data.find(user => user.email === auth.e_mail);
        if (user) {
          setUserId(user._id);
          setUser(user)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [  auth.e_mail]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      ...User,
      photo: Image,
      contactNumber: ContactNumber
    }
    setuserData(newData);
    console.log(userData);

    try {
      await axios.put(`/user/${userId}`, userData);
      console.log("enviado:", newData);
    } catch (error) {
      console.log(error);
    }

    return newData;
  };

  return (
    <section className={styles.settings}>
      <h1>user settings</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>foto</label>
          <input type="text" value={Image} onChange={e => setImage(e.target.value)} />
        </div>
        <div>
          <label>telefono</label>
          <input type="tel" value={ContactNumber} onChange={e => setContactNumber(e.target.value)} />
        </div>
        <button>guardar</button>
      </form>
    </section>
  );
};

export default UserSettings;
