import { Link } from "react-router"

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      title: "PLAY WILD",
      subtitle: "WITH ULTRA, FUTURE & KING",
      image: "../../../public/img/homeimg4.avif",
      buttons: [
        { text: "SHOP NEW IN SOCCER", to: "/all?gender=men&category=shoes" },
        { text: "SHOP CLEATS", to: "/all?gender=men&category=shoes" }
      ]
    },
    {
      id: 2,
      title: "VELOCITY 4",
      subtitle: "THE WAY RUNNING SHOULD FEEL",
      image: "../../../public/img/homeimg5.avif",
      buttons: [
        { text: "SHOP NEW IN RUNNING", to: "/all?gender=men&category=shoes" },
        { text: "SHOP ROAD RUNNING", to: "/all?gender=men&category=shoes" }
      ]
    },
    {
      id: 3,
      title: "MB.04 FLARE",
      subtitle: "BY LAMELO BALL",
      image: "../../../public/img/homeimg6.avif",
      buttons: [
        { text: "SHOP NEW IN BASKETBALL", to: "/all?gender=men&category=shoes" },
        { text: "SHOP MB COLLECTION", to: "/all?gender=men&category=shoes" }
      ]
    }
  ]

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-11/12 mx-auto">
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:hidden">
          <ProductCard product={products[0]} />
          <ProductCard product={products[1]} />
          <div className="md:col-span-2">
            <ProductCard product={products[2]} isFullWidth />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isFullWidth />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, isFullWidth = false }) => {
  return (
    <Link className="group mt-5 bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1">

      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
      </div>

      <div className="p-6 text-center">
        <h3 className={`font-bold text-gray-900 mb-2 ${
          isFullWidth ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
        }`}>
          {product.title}
        </h3>
        <p className={`text-gray-600 uppercase tracking-wide mb-6 ${
          isFullWidth ? 'text-base md:text-lg' : 'text-sm md:text-base'
        }`}>
          {product.subtitle}
        </p>

        <div className={`flex flex-col space-y-3 ${
          isFullWidth ? 'md:flex-row md:space-y-0 md:space-x-4 md:justify-center' : ''
        }`}>
          {product.buttons.map((button, index) => (
            <Link
              key={index}
              to={button.to}
              className={`md:min-w-60 m-auto mb-4 bg-[#181818] text-white py-3 px-4 font-semibold uppercase tracking-wide text-center hover:bg-gray-800 transition-all duration-200 transform ${
                isFullWidth ? 'text-base md:px-6' : 'text-xs md:text-sm'
              }`}
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ProductShowcase