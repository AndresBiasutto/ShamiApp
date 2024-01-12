import useAuth from "../../hooks/useAuth";

const OrderControl = () => {
  const { order } = useAuth();
  return (
    <div>
      {order &&
        Object.entries(order).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}</p>
        ))}
    </div>
  );
}; 

export default OrderControl;
