import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiPuma } from 'react-icons/si';
import { Link } from 'react-router';
import { useGetBasketQuery, useGetProductQuery } from '../../store/API';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [wishlistCount, setWishlistCount] = useState(0);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const { data, isLoading, isError } = useGetProductQuery();

    const { data: basketData } = useGetBasketQuery();
    const cartItems = basketData?.[0]?.items || [];
    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    useEffect(() => {
        const updateWishlistCount = () => {
            const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                setWishlistCount(updatedWishlist.length);
            };

            updateWishlistCount();

            window.addEventListener("wishlistUpdated", updateWishlistCount);
            window.addEventListener("storage", updateWishlistCount); 

            return () => {
                window.removeEventListener("wishlistUpdated", updateWishlistCount);
                window.removeEventListener("storage", updateWishlistCount);
            };
        }, []);



    const filteredProducts = data?.filter(product => {
        if (!product?.name) return false;
        return product.name.toLowerCase().includes(searchValue.toLowerCase());
    }) || [];

    const displayProducts = searchValue.trim() === "" ? [] : filteredProducts;

    const [activeAccordion, setActiveAccordion] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isMenuOpen) {
            setActiveAccordion(null);
        }
    };

    const toggleAccordion = (menuName) => {
        setActiveAccordion(activeAccordion === menuName ? null : menuName);
    };

    const handleMouseEnter = (menuName) => {
        setHoveredMenu(menuName);
    };

    const handleMouseLeave = () => {
        setHoveredMenu(null);
    };

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchValue(""); 
        document.body.style.overflow = 'unset'; 
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchFocus = () => {
        setIsSearchOpen(true);
    };
    const promoMessages = [
        {
            text: "FREE SHIPPING ON ORDERS $60+",
            linkText: "SEE DETAILS",
            href: "/"
        },
        {
            text: "WE'RE MOVING - CUSTOMER SERVICE UPDATE",
            linkText: "LEARN MORE", 
            href: "/"
        },
        {
            text: "FREE AND EASY RETURNS",
            linkText: "SEE DETAILS",
            href: "/"
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPromoIndex((prevIndex) => 
                (prevIndex + 1) % promoMessages.length
            );
        }, 8000); // Change 8 sec

        return () => clearInterval(interval);
    }, []);
    // Mobile 
    const mobileMenuItems = [
        {
            id: 'featured',
            title: 'New & Featured',
            hasLink: true,
            link: '#',
            subItems: [
                { title: 'Back to School', items: ['Uniform Shoes', 'Low Profile Shoes', 'Loungewear'], link:'/all?gender=featured&category=back-to-school' },
                { title: 'Fall Sports', items: ['Jerseys', 'Soccer Cleats'] },
                { title: 'New Arrivals', items: ["Women's", "Men's", 'Kids'] },
                { title: 'Classics', items: ['Speedcat', 'RS', 'Palermo'] }
            ]
        },
        {
            id: 'women',
            title: 'Women',
            hasLink: true,
            link: '/categorypage?gender=women',
            subItems: [
                { title: 'Shoes', items: ['Lifestyle', 'Slides & Sandals', 'White Shoes', 'Running'], link:'/all?gender=women&category=shoes' },
                { title: 'Clothing', items: ['T-Shirts & Tops', 'Leggings', 'Jackets', 'Hoodies'], link:'/all?gender=women&category=clothing' },
                { title: 'Accessories', items: ['Socks', 'Bags', 'Hats'], link:'/all?gender=women&category=accessories'  },
                { title: 'Sports', items: ['Yoga', 'Training', 'Running'], link:'/all?gender=women&category=sports'  }
            ]
        },
        {
            id: 'men',
            title: 'Men',
            hasLink: true,
            link: '/categorypage?gender=men',
            subItems: [
                { title: 'Shoes', items: ['Lifestyle', 'Slides & Sandals', 'White Shoes', 'Running'], link:'/all?gender=men&category=shoes'  },
                { title: 'Clothing', items: ['T-Shirts & Tops', 'Leggings', 'Jackets', 'Hoodies'], link:'/all?gender=men&category=men-clothing'  },
                { title: 'Accessories', items: ['Socks', 'Bags', 'Hats'], link:'`/all?gender=men&category=accessories`'  },
                { title: 'Sports', items: ['Yoga', 'Training', 'Running'], link:'/all?gender=men&category=sports'   }
            ]
        },
        {
            id: 'kids',
            title: 'Kids',
            hasLink: true,
            link: '/categorypage?gender=kids',
            subItems: [
                { title: 'Boys Shoes', items: ['Lifestyle', 'Basketball', 'Slides'], link:'/all?gender=kids&category=boys-shoes'  },
                { title: 'Girls Shoes', items: ['Low Profile', 'Soccer', 'Running'], link:'/all?gender=kids&category=girls-shoes'  },
                { title: 'Kids Clothing', items: ['T-Shirts', 'Loungewear', 'Matching Sets'], link:'/all?gender=kids&category=kids-clothnig' },
                { title: 'By Size', items: ['Toddler', 'Little Kid', 'Big Kid'], link:'/all?gender=kids&category=by-size' }
            ]
        },
        {
            id: 'collaborations',
            title: 'Collaborations',
            hasLink: false,
            subItems: [
                { title: 'Featured', items: ['Latest Releases', 'Popular Items', 'Trending Now'], link:'/' },
                { title: 'Categories', items: ['Footwear', 'Apparel', 'Accessories'], link:'/' },
                { title: 'Collections', items: ['Limited Edition', 'Signature Series', 'Heritage'], link:'/' },
                { title: 'Brands', items: ['Partner Brands', 'Exclusive Collabs', 'Designer Series'], link:'/' }
            ]
        },
        {
            id: 'sport',
            title: 'Sport',
            hasLink: false,
            subItems: [
                { title: 'Featured', items: ['Latest Releases', 'Popular Items', 'Trending Now'], link:'/' },
                { title: 'Categories', items: ['Footwear', 'Apparel', 'Accessories'], link:'/'  },
                { title: 'Collections', items: ['Limited Edition', 'Signature Series', 'Heritage'], link:'/' },
                { title: 'Brands', items: ['Partner Brands', 'Exclusive Collabs', 'Designer Series'], link:'/' }
            ]
        },
        {
            id: 'sale',
            title: 'Sale',
            hasLink: false,
            subItems: [
                { title: 'Back to School', items: ['Uniform Shoes', 'Low Profile Shoes', 'Loungewear'], link:'/' },
                { title: 'Fall Sports', items: ['Jerseys', 'Soccer Cleats'], link:'/' },
                { title: 'New Arrivals', items: ["Women's", "Men's", 'Kids'], link:'/' },
                { title: 'Classics', items: ['Speedcat', 'RS', 'Palermo'], link:'/' }
            ]
        }
    ];
    useEffect(() => {
    if (isSearchOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSearchOpen]);
    return (
        <>
            <aside aria-label="Promo Banner" data-test-id="promo-banner">
                <section className="flex h-11 bg-white font-sans text-black items-center justify-center text-xs sm:text-sm relative overflow-hidden">
                    <div className="relative w-full flex items-center justify-center">
                        {promoMessages.map((message, index) => (
                            <div
                                key={index}
                                className={`absolute transition-all duration-700 ease-out inline-flex flex-row ${
                                    index === currentPromoIndex 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                            >
                                <div className="flex flex-wrap text-center leading-none font-bold justify-center items-center">
                                    <span>{message.text}</span>
                                    <Link 
                                        aria-disabled="false" 
                                        className="cursor-pointer inline whitespace-nowrap uppercase text-xs ml-3 underline hover:no-underline transition-all duration-200" 
                                        aria-label={message.linkText} 
                                        to={message.href}
                                    >
                                        {message.linkText}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </aside>
            <header className="bg-[#181818] text-white sticky py-2 top-0 w-full z-50 shadow-md">
                <nav className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
                    <div className="flex items-center space-x-4 md:hidden">
                        <button onClick={toggleMenu} aria-label="Toggle menu">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-gray-300">
                            <Heart size={20} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {wishlistCount}
                                </span>
                            )}
                         </Link>
                    </div>
                    
                    <div className="flex-shrink-0">
                        <div className="text-white text-2xl">
                            <Link to='/'>
                                <SiPuma />
                            </Link>
                            
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 md:hidden">
                        
                        <Link to="/cart" aria-label="Shopping cart" className="relative hover:text-gray-300">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            to={user ? "/account" : "/login"}
                            aria-label="Account"
                            className="hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
                        >
                            <User size={20} />
                            {user && <span>{user}</span>}
                        </Link>
                    </div>

                    <div className="relative group hidden md:flex items-center space-x-8 flex-1 justify-start ml-7">
                        <a
                            onMouseEnter={() => handleMouseEnter('featured')}
                            onMouseLeave={handleMouseLeave}
                            className="text-white py-7 hover:text-gray-300 transition-colors duration-300 font-medium cursor-pointer"
                        >
                            New & Featured
                        </a>

                        <Link
                            to="/categorypage?gender=women"
                            onMouseEnter={() => handleMouseEnter('women')}
                            onMouseLeave={handleMouseLeave}
                            className="text-white py-7 hover:text-gray-300 transition-colors duration-300 font-medium cursor-pointer"
                        >
                            Women
                        </Link>

                        <Link
                            to="/categorypage?gender=men"
                            onMouseEnter={() => handleMouseEnter('men')}
                            onMouseLeave={handleMouseLeave}
                            className="text-white py-7 hover:text-gray-300 transition-colors duration-300 font-medium cursor-pointer"
                        >
                            Men
                        </Link>

                        <Link
                            to="/categorypage?gender=kids"
                            onMouseEnter={() => handleMouseEnter('kids')}
                            onMouseLeave={handleMouseLeave}
                            className="text-white py-7 hover:text-gray-300 transition-colors duration-300 font-medium cursor-pointer"
                        >
                            Kids
                        </Link>
                        <Link
                            onMouseEnter={() => handleMouseEnter('collaborations')}
                            onMouseLeave={handleMouseLeave}
                            className="text-white py-7 hover:text-gray-300 transition-colors duration-300 font-medium cursor-pointer"
                        >
                            Collaborations
                        </Link>
                        <Link
                            onMouseEnter={() => handleMouseEnter('sport')}
                            onMouseLeave={handleMouseLeave}
                            className="text-white py-7 hover:text-gray-300 transition-colors duration-300 font-medium cursor-pointer"
                        >
                            Sport
                        </Link>
                        <Link
                            onMouseEnter={() => handleMouseEnter('sale')}
                            onMouseLeave={handleMouseLeave}
                            className="text-white py-7 hover:text-gray-300 transition-colors duration-300 font-medium cursor-pointer"
                        >
                            Sale
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative hidden lg:inline">
                            <input
                                onFocus={handleSearchFocus}
                                value={searchValue}
                                onChange={handleSearchChange}
                                type="text"
                                placeholder="SEARCH"
                                className="bg-transparent border border-white rounded px-4 py-2 pr-10 text-white placeholder-white focus:outline-none focus:border-gray-300 w-48 transition-all duration-300"
                            />
                            <Search 
                                className="absolute right-3 top-2.5 w-4 h-4 text-white cursor-pointer" 
                                onClick={handleSearchClick} 
                            />
                        </div>
                        <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-gray-300">
                            <Heart size={20} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {wishlistCount}
                                </span>
                            )}
                        </Link>
                        
                        <Link to="/cart" aria-label="Shopping cart" className="relative hover:text-gray-300">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            to={user ? "/account" : "/login"}
                            aria-label="Account"
                            className="hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
                        >
                            <User size={20} />
                            {user && <span>{user}</span>}
                        </Link>
                    </div>
                </nav>

                {/* Mobile Accordion Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#181818] border-t border-gray-800 transition-all duration-300 max-h-screen overflow-y-auto">
                        <div className="px-4 py-2">
                            {/* Search Bar */}
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                        onFocus={handleSearchFocus}
                                        className="w-full bg-transparent border border-white rounded px-4 py-2 pr-10 text-white placeholder-white focus:outline-none focus:border-gray-300 transition-all duration-300"
                                    />
                                    <Search 
                                        className="absolute right-3 top-2.5 w-4 h-4 text-white cursor-pointer" 
                                        onClick={handleSearchClick}
                                    />
                                </div>
                            </div>

                            {/* Accordion Menu Items */}
                            {mobileMenuItems.map((menuItem) => (
                                <div key={menuItem.id} className="border-b border-gray-700 last:border-b-0">
                                    <div className="flex items-center justify-between py-3">
                                        <div className="flex-1">
                                            {menuItem.hasLink ? (
                                                <Link 
                                                    to={menuItem.link}
                                                    onClick={toggleMenu}
                                                    className="text-white hover:text-gray-300 transition-colors duration-300 font-medium text-left w-full"
                                                >
                                                    {menuItem.title}
                                                </Link>
                                            ) : (
                                                <span className="text-white font-medium">
                                                    {menuItem.title}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <button
                                            onClick={() => toggleAccordion(menuItem.id)}
                                            className="p-1 text-white hover:text-gray-300 transition-colors duration-300"
                                            aria-label={`Toggle ${menuItem.title} submenu`}
                                        >
                                            {activeAccordion === menuItem.id ? (
                                                <ChevronUp size={20} />
                                            ) : (
                                                <ChevronDown size={20} />
                                            )}
                                        </button>
                                    </div>
                                    
                                    <div 
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            activeAccordion === menuItem.id 
                                                ? 'max-h-96 opacity-100 pb-4' 
                                                : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className="pl-4 space-y-3">
                                            {menuItem.subItems.map((subItem, subIndex) => (
                                                <Link to={subItem.link} key={subIndex}>
                                                    <h4 className="text-white font-semibold text-sm mb-2">
                                                        {subItem.title}
                                                    </h4>
                                                    <div className="space-y-1 pl-2">
                                                        {subItem.items.map((item, itemIndex) => (
                                                            <Link
                                                                key={itemIndex}
                                                                onClick={toggleMenu}
                                                                className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm py-1"
                                                            >
                                                                {item}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div
                    onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                    onMouseLeave={handleMouseLeave}
                    className={`absolute top-full left-0 w-full bg-white shadow-xl z-50 transition-all duration-300 transform ${
                        hoveredMenu 
                            ? 'opacity-100 translate-y-0 visible' 
                            : 'opacity-0 -translate-y-2 invisible'
                    }`}
                >
                    <div className="flex h-60 justify-between p-6 max-w-screen-xl mx-auto text-gray-800 text-sm font-medium">

                        {(hoveredMenu === 'sale' || hoveredMenu === 'featured') && (
                            <>
                                <div className="space-y-2">
                                    <Link to="/all?gender=featured&category=back-to-school" className="font-bold text-black text-2xl">Back to School</Link>
                                    <hr className='my-2' />
                                    <Link to="/uniform-shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Uniform Shoes</Link>
                                    <Link to="/low-profile-shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Low Profile Shoes</Link>
                                    <Link to="/loungewear" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Loungewear</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link className="font-bold text-black text-2xl">Fall Sports</Link>
                                    <hr className='my-2' />
                                    <Link to="/jerseys" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Jerseys</Link>
                                    <Link to="/soccer-cleats" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Soccer Cleats</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link className="font-bold text-black text-2xl">New Arrivals</Link>
                                    <hr className='my-2' />
                                    <Link to="/womens" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Women's</Link>
                                    <Link to="/mens" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Men's</Link>
                                    <Link to="/kids" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Kids</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link className="font-bold text-black text-2xl">Classics</Link>
                                    <hr className='my-2' />
                                    <Link to="/speedcat" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Speedcat</Link>
                                    <Link to="/rs" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">RS</Link>
                                    <Link to="/palermo" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Palermo</Link>
                                </div>
                            </>
                        )}

                        {(hoveredMenu === 'women') && (
                            <>
                                <div className="space-y-2">
                                    <Link to="/all?gender=women&category=shoes" className="font-bold text-black text-2xl">Shoes</Link>
                                    <hr className='my-2' />
                                    <Link to="/all?gender=women&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Lifestyle</Link>
                                    <Link to="/all?gender=women&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Slides & Sandals</Link>
                                    <Link to="/all?gender=women&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">White Shoes</Link>
                                    <Link to="/all?gender=women&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Running</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/all?gender=women&category=clothing" className="font-bold text-black text-2xl">Clothing</Link>
                                    <hr className='my-2' />
                                    <Link to="/all?gender=women&category=clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">T-Shirts & Tops</Link>
                                    <Link to="/all?gender=women&category=clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Leggings</Link>
                                    <Link to="/all?gender=women&category=clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Jackets</Link>
                                    <Link to="/all?gender=women&category=clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Hoodies</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/all?gender=women&category=accessories" className="font-bold text-black text-2xl">Accessories</Link>
                                    <hr className='my-2' />
                                    <Link to="/socks" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Socks</Link>
                                    <Link to="/bags" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Bags</Link>
                                    <Link to="/hats" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Hats</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="sports" className="font-bold text-black  text-2xl">Sports</Link>
                                    <hr className='my-2' />
                                    <Link to="/yoga" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Yoga</Link>
                                    <Link to="/training" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Training</Link>
                                    <Link to="/running-sport" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Running</Link>
                                </div>
                            </>
                        )}

                        {(hoveredMenu === 'men') && (
                            <>
                                <div className="space-y-2">
                                    <Link to="/all?gender=men&category=shoes" className="font-bold text-black text-2xl">Shoes</Link>
                                    <hr className='my-2' />
                                    <Link to="/all?gender=men&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Lifestyle</Link>
                                    <Link to="/all?gender=men&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Slides & Sandals</Link>
                                    <Link to="/all?gender=men&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">White Shoes</Link>
                                    <Link to="/all?gender=men&category=shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Running</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/all?gender=men&category=men-clothing" className="font-bold text-black text-2xl">Clothing</Link>
                                    <hr className='my-2' />
                                    <Link to="/all?gender=men&category=men-clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">T-Shirts & Tops</Link>
                                    <Link to="/all?gender=men&category=men-clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Leggings</Link>
                                    <Link to="/all?gender=men&category=men-clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Jackets</Link>
                                    <Link to="/all?gender=men&category=men-clothing" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Hoodies</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/all?gender=men&category=men-accessories" className="font-bold text-black text-2xl">Accessories</Link>
                                    <hr className='my-2' />
                                    <Link to="/socks" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Socks</Link>
                                    <Link to="/bags" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Bags</Link>
                                    <Link to="/hats" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Hats</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="sports" className="font-bold text-black  text-2xl">Sports</Link>
                                    <hr className='my-2' />
                                    <Link to="/yoga" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Yoga</Link>
                                    <Link to="/training" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Training</Link>
                                    <Link to="/running-sport" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Running</Link>
                                </div>
                            </>
                        )}

                        {hoveredMenu === 'kids' && (
                            <>
                                <div className="space-y-2">
                                    <Link to="/boys-shoes" className="font-bold text-black text-2xl">Boys Shoes</Link>
                                    <hr className='my-2' />
                                    <Link to="/boys-lifestyle" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Lifestyle</Link>
                                    <Link to="/boys-basketball" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Basketball</Link>
                                    <Link to="/boys-slides" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Slides</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/all?gender=kids&category=girls-Shoes" className="font-bold text-black text-2xl">Girls Shoes</Link>
                                    <hr className='my-2' />
                                    <Link to="/all?gender=kids&category=girls-Shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Low Profile</Link>
                                    <Link to="/all?gender=kids&category=girls-Shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Soccer</Link>
                                    <Link to="/all?gender=kids&category=girls-Shoes" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Running</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/kids-clothing" className="font-bold text-black text-2xl">Kids Clothing</Link>
                                    <hr className='my-2' />
                                    <Link to="/kids-tshirts" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">T-Shirts</Link>
                                    <Link to="/kids-loungewear" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Loungewear</Link>
                                    <Link to="/kids-matching-sets" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Matching Sets</Link>
                                </div>
                                <div className="space-y-2">
                                    <Link to="/bySize" className="font-bold text-black text-2xl">By Size</Link>
                                    <hr className='my-2' />
                                    <Link to="/toddler" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Toddler</Link>
                                    <Link to="/little-kid" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Little Kid</Link>
                                    <Link to="/big-kid" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Big Kid</Link>
                                </div>
                            </>
                        )}

                        {(hoveredMenu === 'collaborations' || hoveredMenu === 'sport') && (
                            <>
                                <div className="space-y-2">
                                    <Link className="font-bold text-black text-2xl">Featured</Link>
                                    <hr className='my-2' />
                                    <Link to="/latest-releases" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Latest Releases</Link>
                                    <Link to="/popular-items" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Popular Items</Link>
                                    <Link to="/trending-now" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Trending Now</Link>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-black text-2xl">Categories</p>
                                    <hr className='my-2' />
                                    <Link to="/footwear" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Footwear</Link>
                                    <Link to="/apparel" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Apparel</Link>
                                    <Link to="/accessories" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Accessories</Link>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-black text-2xl">Collections</p>
                                    <hr className='my-2' />
                                    <Link to="/limited-edition" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Limited Edition</Link>
                                    <Link to="/signature-series" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Signature Series</Link>
                                    <Link to="/heritage" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Heritage</Link>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-black text-2xl">Brands</p>
                                    <hr className='my-2' />
                                    <Link to="/partner-brands" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Partner Brands</Link>
                                    <Link to="/exclusive-collabs" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Exclusive Collabs</Link>
                                    <Link to="/designer-series" className="block hover:text-gray-600 cursor-pointer transition-colors duration-300">Designer Series</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Search Modal */}
                {isSearchOpen && (
                    <div className="fixed inset-0 bg-white z-[1000] overflow-y-auto mt-45 md:mt-30">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-2xl font-bold text-black">Search Products</h2>
                                <button 
                                    onClick={handleSearchClose} 
                                    className="text-black hover:text-gray-500 transition-colors"
                                    aria-label="Close search"
                                    
                                >
                                    <X size={28} />
                                </button>
                            </div>
                            
                            {isLoading && (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">Loading products...</p>
                                </div>
                            )}
                            
                            {isError && (
                                <div className="text-center py-8">
                                    <p className="text-red-500">Failed to load products. Please try again.</p>
                                </div>
                            )}
                            
                            {!isLoading && !isError && searchValue.trim() !== "" && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {displayProducts.length} result{displayProducts.length !== 1 ? 's' : ''} for "{searchValue}"
                                    </p>
                                    
                                    {displayProducts.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {displayProducts.map(product => (
                                                <Link
                                                    to={`/details/${product.slug}`}
                                                    key={product.id} 
                                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                                    onClick={handleSearchClose} 
                                                >
                                                    <img
                                                        src={product.images?.[0]?.url || "/placeholder.png"}
                                                        alt={product.name}
                                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                                        onError={(e) => {
                                                            e.target.src = "/placeholder.png";
                                                        }}
                                                    />
                                                    <h3 className="font-medium text-black text-sm line-clamp-2">
                                                        {product.name}
                                                    </h3>
                                                    {product.price && (
                                                        <p className="text-gray-600 text-sm mt-1">
                                                            ${product.price}
                                                        </p>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500 text-lg mb-2">No products found</p>
                                            <p className="text-gray-400 text-sm">Try searching with different keywords</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {!isLoading && !isError && searchValue.trim() === "" && (
                                <div className="text-center py-12">
                                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg mb-2">Start typing to search</p>
                                    <p className="text-gray-400 text-sm">Find your favorite PUMA products</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}

export default Header