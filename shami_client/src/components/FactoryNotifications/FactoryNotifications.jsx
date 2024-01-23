import useAuth from "../../hooks/useAuth"
import OrderDetail from "../OrderControl/OrderDetail/OrderDetail"
const FactoryNotifications = () => {
  const {orderState}=useAuth()
  return (
    <div>
          <OrderDetail
      order= {orderState}
    />
    </div>
  )
}

export default FactoryNotifications