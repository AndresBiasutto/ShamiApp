import useAuth from "../../hooks/useAuth";
import { Admin } from "../../components/componentsIndex";
import Factory from "../../components/Factory/Factory";
import Header from "../../components/Header/Header";
import Manager from "../../components/Manager/Manager";

const Home = () => {
  const { auth } = useAuth();
  const role = auth?.roles;

  return (
    <div>
      <Header />
      <div>
        {role === "admin" ? (
          <Admin />
        ) : role === "factory" ? (
          <Factory />
        ) : (
          <Manager />
        )}
      </div>
    </div>
  );
};

export default Home;
