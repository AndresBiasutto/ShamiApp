import { useNavigate } from "react-router-dom";
import styles from "./GoBack.module.css"
import { IoIosArrowBack } from "react-icons/io";


const GoBack = () => {
    const navigate= useNavigate();

  const goBack= ()=> navigate(-1);
  return (
    <button className={styles.button} title="Volver a la página anterior" onClick={goBack} ><IoIosArrowBack className={styles.arrow} /></button>
  )
}

export default GoBack