import { Link } from "react-router"

const TrendingSection = () => {
  const trendingData = [
    {
      id: 1,
      title: "CLOSET REFRESH",
      subtitle: "DISCOVER WHAT'S NEW NOW",
      image: "../../../public/img/homeimg1.avif", 
      links: [
        { text: "MEN'S NEW ARRIVALS", to: "/all?gender=men&category=shoes" },
        { text: "WOMEN'S NEW ARRIVALS", to: "/all?gender=women&category=shoes" }
      ]
    },
    {
      id: 2,
      title: "BEST-SELLING STYLES",
      subtitle: "EXPLORE POPULAR PICKS",
      image: "../../../public/img/homeimg2.avif",
      links: [
        { text: "MEN'S BEST SELLERS", to: "/all?gender=men&category=shoes" },
        { text: "WOMEN'S BEST SELLERS", to: "/all?gender=women&category=shoes" }
      ]
    }
  ]

  return (
    <section className="relative w-full py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1500px] mx-auto">
        {trendingData.map((item) => (
          <div key={item.id}>
            <div className="relative w-full overflow-hidden rounded-lg">

              <div className="relative w-full aspect-square bg-gray-900">
                <img
                  src={item.image}
                  alt={`${item.title} | PUMA`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
              </div>

              <div className="mt-6 w-full">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 uppercase tracking-wide">
                    {item.subtitle}
                  </p>
                </div>

                <div className="flex flex-col space-y-3 max-w-xs mx-auto">
                  {item.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="bg-[#181818] text-white py-3 px-6 text-sm font-semibold uppercase tracking-wide text-center rounded-sm hover:bg-gray-800 transition duration-200 transform hover:scale-105"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrendingSection
