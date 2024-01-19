import { createContext, useState } from "react";

const AuthContext= createContext({});

export const AuthProvider= ({children})=>{
    const [auth, setAuth]= useState({});
    const [products, setProduct]= useState([])
    const [orderState, setOrderState]= useState({})
    const [orderID, setOrderId]= useState("")

    const logOut = () => {
        // Aquí puedes realizar las acciones necesarias para cerrar sesión,
        // como limpiar el token de autenticación, limpiar el estado, etc.
        setAuth({});
      };

    return(
        <AuthContext.Provider value={{auth, setAuth, logOut, products, setProduct, orderState, setOrderState ,orderID, setOrderId}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;