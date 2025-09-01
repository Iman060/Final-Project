import { Outlet } from "react-router"
import Header from "../components/user/Header"
import Footer from "../components/user/Footer"

const UserLayout = () => {
  return (
    <div className="">
         <Header />
         <Outlet />
         <Footer />
    </div>
  )
}

export default UserLayout