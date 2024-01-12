import useAuth from "../../hooks/useAuth";
import GoBack from "../GoBack/GoBack";

const Unauthorized = () => {
  const { auth } = useAuth();

  const name = auth.username
  return (
    <>
    <h2>Unauthorized</h2>
    <p>usuario {name} no autorizado </p>
    <GoBack/>
    </>
    
  )
}

export default Unauthorized