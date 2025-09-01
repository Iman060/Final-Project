import { useState } from "react"
import { useLoginMutation } from "../../store/API"
import { toast } from "react-toastify"
import { Link, useNavigate, useLocation } from "react-router"
import { Loader2, Mail, Lock, ArrowLeft, Eye, EyeOff, ShoppingCart } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'
  const message = location.state?.message
  const isFromCart = message?.includes('cart') || from.includes('cart')

  const handleClick = async () => {
    try {
      const user = await login({ email, password }).unwrap()
      localStorage.setItem("token", user.token)
      localStorage.setItem("role", user.user.role)
      localStorage.setItem("user", JSON.stringify(user.user.firstName));
      toast.success("Uğurla giriş edildi")
      
      if (user.user.role === "user") {
        if (from && from !== '/') {
          navigate(from, { replace: true })
        } else {
          navigate("/")
        }
      } else {
        navigate("/admin/products")
      }
    } catch (error) {
      console.error(error)
      toast.error("Giriş uğursuz oldu")
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#181818] text-white relative overflow-hidden">
      
      {/* Go Back */}
      <div className="absolute left-8 top-8 z-10">
        <Link 
          to={from !== '/' ? from : "/"} 
          className="group flex items-center gap-2 px-6 py-3 font-semibold rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Go Back
        </Link>
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="mb-8 text-center">
              <div className="mb-4">
                <div className={`w-16 h-16 mx-auto ${isFromCart ? 'bg-gradient-to-br from-green-900 to-green-600' : 'bg-gradient-to-br from-blue-900 to-blue-600'} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  {isFromCart ? (
                    <ShoppingCart className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                {isFromCart ? 'Sign In to Continue' : 'Welcome Back'}
              </h1>
              <p className="text-gray-400 text-sm">
                {isFromCart ? 'Sign in to add items to your cart' : 'Sign in to access your account'}
              </p>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-xl border ${
                isFromCart 
                  ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isFromCart && <ShoppingCart className="w-4 h-4" />}
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-4 text-sm border border-white/10 bg-white/5 backdrop-blur-sm text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 text-sm border border-white/10 bg-white/5 backdrop-blur-sm text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClick}
                  type="button"
                  disabled={isLoading}
                  className={`w-full group relative overflow-hidden px-6 py-4 font-semibold ${
                    isFromCart 
                      ? 'bg-green-600 hover:bg-green-500 text-white hover:shadow-green-500/25' 
                      : 'bg-white text-[#181818] hover:shadow-green-500/25'
                  } rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex justify-center items-center gap-2">
                    {isLoading ? (
                      <Loader2 className={`animate-spin h-5 w-5 ${isFromCart ? 'text-white' : 'text-black'}`} />
                    ) : (
                      <>
                        {isFromCart && <ShoppingCart className="w-4 h-4" />}
                        {isFromCart ? 'Sign In & Continue Shopping' : 'Sign In'}
                      </>
                    )}
                  </div>
                </button>
              </div>

              {isFromCart && (
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/')}
                    type="button"
                    className="w-full px-6 py-3 font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Continue browsing as guest
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-200">
                Don't have an account?{' '}
                <Link 
                  to="/register"
                  state={{ from: from, message: message }}
                  className="text-white font-semibold transition-all duration-300 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-200 text-center">
                Secure login with end-to-end encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login