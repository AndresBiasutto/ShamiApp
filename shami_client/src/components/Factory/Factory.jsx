import styles from "./Factory.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { LuBell, LuBellRing } from "react-icons/lu";

const Factory = () => {
  const { notifications } = useAuth();
  useEffect(() => {
    console.log(notifications);
  }, [notifications]);
  return (
    <section className={styles.factory}>
      <h2 className={styles.h2}>Factory</h2>
      <nav className={styles.nav}>
        <Link className={`link linkFactory`} to="factorynotifications">
          {notifications === 0 ? (
            <span className={styles.span}>
              <LuBell /> sin notificaciones{" "}
            </span>
          ) : (
            <span className={styles.span}>
              <LuBellRing /> notificaciones pendientes{" "}
              <span className={styles.notifications}>{notifications}</span>
            </span>
          )}
        </Link>
        {/* <Link className={styles.button} to="users" >Controlar pedidos</Link> */}
      </nav>
    </section>
  );
};

export default Factory;
