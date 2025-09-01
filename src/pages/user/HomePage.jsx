import { Link } from "react-router-dom"
import Video from "../../components/user/Video"
import TrendingSection from "../../components/ui/TrendingSection"
import SaleSection from "../../components/ui/SaleSection"
import ProductShowcase from "../../components/ui/ProductShowcase"
import TrendingNow from "../../components/ui/TrendingNow"
import { useEffect, useState } from "react"
import Random from "../../components/ui/Random"



const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [hoveredMenu, setHoveredMenu] = useState(null);
  
      const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
      };
  
      const handleMouseEnter = (menuName) => {
          setHoveredMenu(menuName);
      };
  
      const handleMouseLeave = () => {
          setHoveredMenu(null);
      };

      useEffect(() => {
        document.title = "Puma";
      }, []);

  return (
    <div className="inter-Puma">

      <Video />

      
      {/* Walk The Walk */}
      <div className=" py-10 px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          WALK THE WALK
        </h1>
        
        <p className="text-lg max-w-5xl text-[#181818] mt-4">
          GO BACK TO SCHOOL WITH PUMA
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-5">
          <Link to="/categorypage?gender=men"
                onMouseEnter={() => handleMouseEnter('men')}
                onMouseLeave={handleMouseLeave}  className="bg-[#181818]  text-white px-8 py-3 font-bold text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300 min-w-[140px]">
            SHOP MEN
          </Link>
          <Link to="/categorypage?gender=women"
                onMouseEnter={() => handleMouseEnter('women')}
                onMouseLeave={handleMouseLeave} className="bg-[#181818] text-white px-8 py-3 font-bold text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300 min-w-[140px]">
            SHOP WOMEN
          </Link>
          <Link to="/categorypage?gender=kids"
                onMouseEnter={() => handleMouseEnter('kids')}
                onMouseLeave={handleMouseLeave} className="bg-[#181818] text-white px-8 py-3 font-bold text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300 min-w-[140px]">
            SHOP KIDS
          </Link>
        </div>
      </div>
      </div>

      <TrendingSection/>
      
      <SaleSection/>

      <ProductShowcase />

      <TrendingNow />

      <div className="max-w-[1490px] container mx-auto mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            SHOP THE BEST OF THE BEST
          </h1>
        </div>
        <Random />
      </div>
    </div>
  )
}

export default HomePage