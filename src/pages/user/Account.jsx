import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import {
  Search, LogOut, User, Package, Settings, Phone, HelpCircle
} from "lucide-react"
import TrendingNow from "../../components/ui/TrendingNow"

const Account = () => {
  const [user, setUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      {/* Logout Button */}
      <div className="p-4  bg-white  flex justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 font-medium rounded-lg border border-red-500 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Profile Section */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr opacity-50" />
              <div className="relative">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br bg-[#181818] rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Hello, {user || 'User'}
                </h2>
                
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {[
                { icon: Package, color: "text-blue-600", title: "My Orders", desc: "View the progress of your order, or arrange an exchange or return", to:"/cart" },
                { icon: Settings, color: "text-green-600", title: "Account Details", desc: "View or change your sign-in information", to:"/" },
                { icon: Phone, color: "text-purple-600", title: "Contact Us", desc: "Still need some support? Get in touch with us so we can help", to:"/" },
                { icon: HelpCircle, color: "text-orange-600", title: "FAQ", desc: "Find lots of helpful information on orders, returns and much more", to:"/" }
              ].map((item, idx) => (
                <Link 
                  to={item.to}
                  key={idx}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer border border-gray-100"
                >
                  <div className="flex items-center shadow-xs mb-4">
                    <item.icon className={`h-6 w-6 ${item.color} mr-3`} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TrendingNow />
    </div>
  )
}

export default Account
