import { Link } from "react-router"

const ShoesScroll = () => {
  const products = [
    {
      id: 1,
      name: 'SPEEDCAT',
      image: '../../../public/img/shoe1.avif',
      color: 'black'
    },
    {
      id: 2,
      name: 'H-STREET',
      image: '../../../public/img/shoe2.avif',
      color: 'gray'
    },
    {
      id: 3,
      name: 'SUEDE XL',
      image: '../../../public/img/shoe3.avif',
      color: 'black'
    },
    {
      id: 4,
      name: 'PALERMO',
      image: '../../../public/img/shoe4.avif',
      color: 'white'
    },
    {
      id: 5,
      name: 'CLASSIC',
      image: '../../../public/img/shoe5.avif',
      color: 'navy'
    },
    {
      id: 6,
      name: 'RUNNER',
      image: '../../../public/img/shoe6.avif',
      color: 'red'
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            SHOP THE BEST OF THE BEST
          </h1>
        </div>

        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-600">
            {products.map((product) => (
              <Link
                key={product.id}
                className="flex-none w-72  rounded-2xl  transition-all duration-300 transform cursor-pointer group"
              >
                <div className="relative h-64  rounded-t-2xl overflow-hidden">
                  <img src={product.image} alt="" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-black text-gray-900 tracking-wider mb-3">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoesScroll