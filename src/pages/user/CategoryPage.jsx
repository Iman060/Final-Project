import { useEffect } from "react";
import NoProduct from "../../components/user/NoProduct";
import Video from "../../components/user/Video"
export const categoryData = {
  men: {
    heroImages: [
      { src: "../../../public/img/man1.avif", title: "Men's Shoes" },
      { src: "../../../public/img/man2.avif", title: "Men's Clothing" }
    ],
    trendingItems: [
      { id: 1, title: "MAN'S TOP", image: "../../../public/img/man3.avif", to:"/all?gender=men&category=men-clothing" },
      { id: 2, title: "MAN'S SHOES", image: "../../../public/img/man4.avif", to:"/all?gender=men&category=men-clothing" },
      { id: 3, title: "MAN'S MATCHING SETS", image: "../../../public/img/man5.avif", to:"/all?gender=men&category=men-clothing" },
      { id: 4, title: "MAN'S DRESSED & SKIRTS", image: "../../../public/img/man6.avif", to:"/all?gender=men&category=men-clothing" }
    ],
    shopByTrending: [
      { src: "../../../public/img/man7.avif", title: "MAN'S LOW PROFILE" },
      { src: "../../../public/img/man8.avif", title: "MAN'S FOOTBALL JERSEY" },
      { src: "../../../public/img/man9.avif", title: "MAN'S SUMMER SHOP" }
    ],
    shopBySport: [
      { src: "../../../public/img/man10.avif", title: "MEN'S RUNNING" },
      { src: "../../../public/img/man11.avif", title: "MEN'S TRAINING" },
      { src: "../../../public/img/man12.avif", title: "MEN'S BASKETBALL" },
      { src: "../../../public/img/man13.avif", title: "MEN'S FOOTBALL" },
      { src: "../../../public/img/man14.avif", title: "MEN'S SPORT ALL SHOP" }
    ],
    links: ["/all?gender=men&category=shoes", "/all?gender=men&category=men-clothing"]
  },
  women: {
    heroImages: [
      { src: "../../../public/img/women1.avif", title: "Women's Shoes" },
      { src: "../../../public/img/women2.avif", title: "Women's Clothing" }
    ],
    trendingItems: [
      { id: 1, title: "WOMAN'S TOP", image: "../../../public/img/women3.avif", to:"/all?gender=women&category=clothing" },
      { id: 2, title: "WOMAN'S SHOES", image: "../../../public/img/women4.avif", to:"/all?gender=women&category=clothing" },
      { id: 3, title: "WOMAN'S MATCHING SETS", image: "../../../public/img/women5.avif", to:"/all?gender=women&category=clothing" },
      { id: 4, title: "WOMAN'S DRESSED & SKIRTS", image: "../../../public/img/women6.avif", to:"/all?gender=women&category=clothing" }
    ],
    shopByTrending: [
      { src: "../../../public/img/women7.avif", title: "WOMAN'S LOW PROFILE" },
      { src: "../../../public/img/women8.avif", title: "WOMAN'S SPEEDCAST" },
      { src: "../../../public/img/women9.avif", title: "WOMAN'S SUMMER SHOP" }
    ],
    shopBySport: [
      { src: "../../../public/img/women10.avif", title: "WOMEN'S RUNNING" },
      { src: "../../../public/img/women11.avif", title: "WOMEN'S TRAINING" },
      { src: "../../../public/img/women12.avif", title: "WOMEN'S BASKETBALL" },
      { src: "../../../public/img/women13.avif", title: "WOMEN'S SOCCER" },
      { src: "../../../public/img/women14.avif", title: "WOMEN'S SPORT ALL SHOP" }
    ],
    links: ["/all?gender=women&category=shoes", "/all?gender=women&category=clothing"]
  },
  kids: {
    heroImages: [
      { src: "../../../public/img/kids1.avif", title: "Kids' Shoes" },
      { src: "../../../public/img/kids2.avif", title: "Kids' Clothing" }
    ],
    trendingItems: [
      { id: 1, title: "KID'S TOP", image: "../../../public/img/kids3.avif", to:"/all?gender=kids&category=girls-Shoes" },
      { id: 2, title: "KID'S SHOES", image: "../../../public/img/kids4.avif", to:"/all?gender=kids&category=girls-Shoes" },
      { id: 3, title: "KID'S MATCHING SETS", image: "../../../public/img/kids5.avif", to:"/all?gender=kids&category=girls-Shoes" },
      { id: 4, title: "KID'S DRESSED & SKIRTS", image: "../../../public/img/kids6.avif", to:"/all?gender=kids&category=girls-Shoes" }
    ],
    shopByTrending: [
      { src: "../../../public/img/kids7.avif", title: "KID'S LOW PROFILE" },
      { src: "../../../public/img/kids8.avif", title: "KID'S SPEEDCAST" },
      { src: "../../../public/img/kids9.avif", title: "KID'S SUMMER SHOP" }
    ],
    shopBySport: [
      { src: "../../../public/img/kids10.avif", title: "KID'S RUNNING" },
      { src: "../../../public/img/kids11.avif", title: "KID'S TRAINING" },
      { src: "../../../public/img/kids12.avif", title: "KID'S BASKETBALL" },
      { src: "../../../public/img/kids13.avif", title: "KID'S SOCCER" },
      { src: "../../../public/img/kids14.avif", title: "KID'S SPORT ALL SHOP" }
    ],
    links: ["/all?gender=kids&category=girls-Shoes", "/all?gender=kids&category=girls-Clothing"]
  }
};


import { Link, useLocation } from "react-router";

const TrendingCard = ({ item, isMobile = false }) => (
  <Link to={item.to} className="group cursor-pointer">
    <div className="relative overflow-hidden bg-gray-900">
      <div className={`relative ${isMobile ? "aspect-square" : "aspect-[4/4]"}`}>
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500" />
        <div className="absolute inset-0 bg-black opacity-20 z-10" />
        <div className="absolute inset-0 flex items-end ml-2 py-4 md:py-6 z-20">
          <h3 className={`text-white md:font-bold uppercase leading-tight ${isMobile ? "text-sm" : "md:text-lg lg:text-lg"}`}>
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  </Link>
);

const CategoryPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryType = searchParams.get("gender") || "men"; 

  const data = categoryData[categoryType];
  
  useEffect(() => {
    if (categoryType) {
      const genderText = categoryType.charAt(0).toUpperCase() + categoryType.slice(1);
      document.title = `Puma | ${genderText}`;
    } else {
      document.title = "Puma";
    }
  }, [categoryType]);

  if (!data) return <NoProduct />

  return (
    <div className="esas mb-5 inter-Puma">
      <Video />
      {/* Hero Section */}
      <div  className="bir my-10 px-7">
        <div className="flex max-w-[1500px] mx-auto gap-2">
          {data.heroImages.map((hero, idx) => (
            <Link key={idx} to={data.links[idx]} className="flex-1 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-30 z-10" />
              <div className="absolute bottom-8 left-8 z-20">
                <h2 className="text-gray-200  md:text-4xl md:font-bold tracking-wider uppercase">{hero.title}</h2>
              </div>
              <img src={hero.src} className="w-full h-full object-cover" alt={hero.title} />
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Items */}
      <Link to={data.links[0]}  className="iki mb-5">
        <section className="py-8 px-4 w-full h-full bg-white">
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 max-w-11/12 mx-auto">
            {data.trendingItems.map(item => <TrendingCard key={item.id} item={item} />)}
          </div>
          <div className="hidden md:block lg:hidden">
            <div className="flex gap-4 overflow-x-auto s pb-4">
              {data.trendingItems.map(item => (
                <div key={item.id} className="flex-shrink-0 w-80">
                  <TrendingCard item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:hidden max-w-11/12 mx-auto">
            {data.trendingItems.map(item => <TrendingCard key={item.id} item={item} isMobile />)}
          </div>
        </section>
      </Link>

      {/* Shop by Trending */}
      <div className="uc my-5">
        <div className="max-w-[1500px] mx-auto my-10 px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">SHOP BY TRENDING</h2>
          <Link to={data.links[0]} className="flex flex-wrap gap-4  justify-between">
            {data.shopByTrending.map((trend, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[200px] relative overflow-hidden flex justify-center"
              >
                <img
                  src={trend.src}
                  alt={trend.title}
                  className=" xs:w-full xs:h-full object-cover mx-auto"
                />
                <h3 className="absolute bottom-4 left-4 text-white md:font-bold text-lg md:text-xl lg:text-2xl uppercase z-10">
                  {trend.title}
                </h3>
              </div>
            ))}
          </Link>

        </div>
      </div>

      {/* Shop by Sport */}
      <div className="dord my-5">
        <div className="max-w-[1500px] mx-auto my-10 px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">SHOP BY SPORT</h2>
          {/* Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
            {data.shopBySport.map((sport, idx) => (
              <Link to={data.links[1]} key={idx} className="relative w-full aspect-[4/5] overflow-hidden group">
                <img src={sport.src} alt={sport.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <h3 className="absolute bottom-4 left-4 text-white md:font-bold text-sm md:text-base lg:text-lg uppercase z-10">
                  {sport.title}
                </h3>
              </Link>
            ))}
          </div>
          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="flex gap-4 w-fit">
              {data.shopBySport.map((sport, idx) => (
                <Link to={data.links[1]} key={idx} className="relative w-[350px] h-[350px] aspect-[4/5] overflow-hidden group flex-shrink-0">
                  <img src={sport.src} alt={sport.title} className="w-full h-full object-cover transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <h3 className="absolute bottom-4 left-4 text-white md:font-bold text-lg uppercase z-10">{sport.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
