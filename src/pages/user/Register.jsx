import { useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router"
import { Loader2 } from "lucide-react"
import { useRegisterMutation } from "../../store/API"

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    dateOfBirth: '',
    gender: 'male'
  })
  
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await register(formData).unwrap()
      console.log(user) 

      localStorage.setItem("token", user.token)
      localStorage.setItem("role", user.user.role)
      toast.success("Hesab uğurla yaradıldı")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Qeydiyyat uğursuz oldu")
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#181818] text-white relative py-8">
      <div className="absolute left-10 top-10">
        <Link to="/" className="px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all">
          Go Back
        </Link>
      </div>
      
      <div className="flex flex-col w-full max-w-md px-8 py-10 rounded-2xl shadow-xl bg-[#1f1f1f]">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Sign up</h1>
          <p className="text-sm text-gray-400 mt-2">Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block mb-1 text-sm text-gray-300">
                First Name
              </label>
              <input
                onChange={handleChange}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="Name"
                required
                className="w-full px-4 py-3 text-sm border border-gray-700 bg-[#181818] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm text-gray-300">
                Last Name
              </label>
              <input
                onChange={handleChange}
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder="Surname"
                required
                className="w-full px-4 py-3 text-sm border border-gray-700 bg-[#181818] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
              Email address
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              name="email"
              placeholder="something@example.com"
              required
              className="w-full px-4 py-3 text-sm border border-gray-700 bg-[#181818] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-gray-300">
              Password
            </label>
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 text-sm border border-gray-700 bg-[#181818] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block mb-1 text-sm text-gray-300">
              Date of Birth
            </label>
            <input
              onChange={handleChange}
              value={formData.dateOfBirth}
              type="datetime-local"
              name="dateOfBirth"
              required
              className="w-full px-4 py-3 text-sm border border-gray-700 bg-[#181818] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block mb-1 text-sm text-gray-300">
              Gender
            </label>
            <select
              onChange={handleChange}
              value={formData.gender}
              name="gender"
              required
              className="w-full px-4 py-3 text-sm border border-gray-700 bg-[#181818] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-6 py-3 font-semibold bg-white text-black rounded-lg hover:bg-gray-200 transition duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-6 w-6 text-black" />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-white hover:text-gray-300 font-semibold underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register