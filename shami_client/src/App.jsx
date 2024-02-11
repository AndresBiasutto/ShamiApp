import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, LinkPage } from "./views/viewsIndex";
import { Admin, Layout, Missing, RequireAuth, Unauthorized, Users } from "./components/componentsIndex";
import Factory from "./components/Factory/Factory";
import Manager from "./components/Manager/Manager";
import OrderControl from "./components/OrderControl/OrderControl";
import SolicitarPedido from "./components/SolicitarPedido/SolicitarPedido";
import FactoryNotifications from "./components/FactoryNotifications/FactoryNotifications";
 import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import useAuth from "./hooks/useAuth";
import OrderUpdate from "./components/OrderUpdate/OrderUpdate";
import AdminOrderControl from "./components/AdminOrderControl/AdminOrderControl";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import CreateProduct from "./components/AdminProducts/CreateProduct/CreateProduct";
import AdminUsers from "./components/AdminUsers/AdminUsers";

function App() {
   const location= useLocation()
   const { auth } = useAuth();
   const role = auth?.roles;
  return (
    <div className={role=== "admin"? "adminColor": role === "factory" ? "factoryColor" : "managerColor"}>
       {location.pathname !== "/login" && <Header />} 
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas publicas */}
        <Route path="login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Rutas protegidas */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="adminproducts" element={<AdminProducts />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="adminusers" element={<AdminUsers />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="adminproducts/createproduct" element={<CreateProduct />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="adminordercontrol" element={<AdminOrderControl />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="users" element={<Users />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["factory"]} />}>
          <Route path="/factory" element={<Factory />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["manager"]} />}>
          <Route path="/manager" element={<Manager />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["manager", "admin"]} />}>
          <Route path="/solicitarpedido" element={<SolicitarPedido />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["manager", "admin"]} />}>
          <Route path="/ordercontrol" element={<OrderControl />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["manager"]} />}>
          <Route path="/ordercontrol/orderupdate" element={<OrderUpdate />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["factory"]} />}>
          <Route path="/factorynotifications" element={<FactoryNotifications />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin", "manager", "factory"]} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>

      {/* Todo lo demas */}
      <Route path="*" element={<Missing />} />
    </Routes>
    </div>
    
  );
}

export default App;
