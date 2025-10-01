import { Link } from "react-router"

const  SaleSection = () => {

    const saleLinks = [
        { text: "SHOP MEN", gender:"men" },
        { text: "SHOP WOMEN", gender:"women"},
        { text: "SHOP KIDS", gender:"kids" }
    ];

  return (
    <section className="mt-5">
        <div className="mx-auto">
            <div className="img relative">
                <img className="w-full md:h-full hidden md:block" src="../../../public/img/homeimg3.avif" alt="" />
                <div className="z-10 top-0 hidden md:flex absolute p-6 md:p-2 xl:p-16 flex-col text-center items-center text-black  md:bg-transparent md:text-white">
                    <div className="mb-2">
                        <h2 className="font-bold leading-tight text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                        40% OFF 4+ ITEMS <br />
                        30% OFF 3 ITEMS <br />
                        20% OFF 2 ITEMS
                        </h2>
                    </div>
                    <p className="mt-1 leading-tight text-sm md:text-lg lg:text-xl xl:text-2xl">
                        GEAR UP FOR BACK TO SCHOOL WITH CODE <span className="font-bold">STOCKUP</span>
                    </p>
                    <p className="text-xs md:text-sm lg:text-base mt-1 opacity-80">
                        EXCLUSIONS APPLY. LIMITED TIME ONLY.
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-4 mt-6 justify-center ">
                        {saleLinks.map((link, index) => (
                        <Link
                            to={`/categorypage?gender=${link.gender}`}
                            key={index}
                            className=" md:bg-white md:text-[#181818] hover:bg-gray-200 px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-sm transition-all duration-200 transform cursor-pointer"
                        >
                            {link.text}
                        </Link>
                        ))}
                    </div>
                    </div>
                <img className="w-full md:h-full md:hidden block" src="../../../public/img/homeimg35.avif" alt="" />
                <div className="md:hidden relative p-6 md:p-12 xl:p-16 flex flex-col text-center items-center text-black  md:bg-transparent md:text-white">

                    <div className="mb-2">
                        <h2 className="font-bold leading-tight text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                        40% OFF 4+ ITEMS <br />
                        30% OFF 3 ITEMS <br />
                        20% OFF 2 ITEMS
                        </h2>
                    </div>
                    <p className="mt-1 leading-tight text-sm md:text-lg lg:text-xl xl:text-2xl">
                        GEAR UP FOR BACK TO SCHOOL WITH CODE <span className="font-bold">STOCKUP</span>
                    </p>
                    <p className="text-xs md:text-sm lg:text-base mt-1 opacity-80">
                        EXCLUSIONS APPLY. LIMITED TIME ONLY.
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-4 mt-6 justify-center ">
                        {saleLinks.map((link, index) => (
                        <Link
                            key={index}
                            className="bg-[#181818] text-white md:bg-white md:text-black hover:bg-gray-700 px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-sm transition-all duration-200 transform cursor-pointer"
                        >
                            {link.text}
                        </Link>
                        ))}
                    </div>
                    </div>
            </div>
        </div>
    </section>
  )
}

export default SaleSection