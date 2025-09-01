import { Link } from "react-router"

const TrendingNow = () => {
  const trendingItems = [
    {
      id: 1,
      title: "FENTY X PUMA X SMURFS",
      image: "../../../public/img/homeimg7.png",
      to: "/all?gender=kids&category=girls-shoes"
    },
    {
      id: 2,
      title: "SCUDERIA FERRARI",
      image: "../../../public/img/homeimg8.png",
      to: "/all?gender=men&category=men-clothing"
    },
    {
      id: 3,
      title: "JERSEYS",
      image: "../../../public/img/homeimg9.png",
      to: "/all?gender=men&category=men-clothing"
    },
    {
      id: 4,
      title: "'90S NOSTALGIA",
      image: "../../../public/img/homeimg10.png",
      to: "/all?gender=men&category=shoes"
    }
  ];

  return (
    <section className="py-8 px-4 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          TRENDING NOW
        </h2>
      </div>

      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 max-w-11/12 mx-auto">
        {trendingItems.map((item) => (
          <TrendingCard key={item.id} item={item} />
        ))}
      </div>

      <div className="hidden md:block lg:hidden">
        <div className="flex gap-4 overflow-x-auto s pb-4">
          
          {trendingItems.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-80">
              <TrendingCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:hidden max-w-11/12 mx-auto">
        {trendingItems.map((item) => (
          <TrendingCard key={item.id} item={item} isMobile />
        ))}
      </div>
    </section>
  );
}

const TrendingCard = ({ item, isMobile = false }) => {
  return (
    <Link to={item.to} className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-900">
        <div className={`relative ${isMobile ? 'aspect-square' : 'aspect-[4/4]'}`}>
          <img
            src={item.image}
            alt={item.title}
            className=" h-full object-cover transition-transform duration-500 "
          />
          
          <div className="absolute inset-0 flex items-end ml-2 py-4 md:py-6">
            <h3 className={`text-white font-bold uppercase leading-tight ${ isMobile ? 'text-sm' : ' md:text-lg lg:text-lg' }`}>
                {/* item.title */}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TrendingNow