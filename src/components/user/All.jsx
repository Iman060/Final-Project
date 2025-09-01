import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetProductQuery } from '../../store/API';
import { Link } from 'react-router';

const All = () => {
  const location = useLocation();
  const [gender, setGender] = useState('women');
  const [category, setCategory] = useState(null); 
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const { data, isLoading, isError } = useGetProductQuery();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [productsToShow, setProductsToShow] = useState(12); // Changed: Track number of products to show
  const [gridColumns, setGridColumns] = useState(4);
  //console.log(data);
  
  const sizes = ['XXS','XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Red', bg: 'bg-red-500' },
    { name: 'Blue', bg: 'bg-blue-500' },
    { name: 'Green', bg: 'bg-green-500' },
    { name: 'Yellow', bg: 'bg-yellow-400' },
    { name: 'Orange', bg: 'bg-orange-500' },
    { name: 'Purple', bg: 'bg-purple-500' },
    { name: 'Pink', bg: 'bg-pink-500' },
    { name: 'Brown', bg: 'bg-amber-700' },
    { name: 'Black', bg: 'bg-black' },
    { name: 'White', bg: 'bg-white border border-gray-400' },
    { name: 'Gray', bg: 'bg-gray-500' },
    { name: 'Navy', bg: 'bg-blue-900' },
    { name: 'Gold', bg: 'bg-yellow-500' },
    { name: 'Silver', bg: 'bg-gray-300' },
    { name: 'Bronze', bg: 'bg-amber-600' },
    { name: 'Sky', bg: 'bg-sky-400' },
    { name: 'Plum', bg: 'bg-purple-800' },
    { name: 'Emerald', bg: 'bg-emerald-500' },
    { name: 'Ruby', bg: 'bg-red-700' }
  ];
  const priceRanges = ['Under $100', '$100 - $150', 'Over $150'];

  const categoryIds = {
    featured: [15] ,
    women: [19, 20, 21], 
    men: [23, 24, 25],
    kids: [28]
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev => 
      prev.includes(colorName) 
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  const togglePrice = (price) => {
    setSelectedPrices(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPrices([]);
    setIsBestSeller(false);
    setProductsToShow(12); // Reset to show initial 12 products
  };

  const matchesPriceRange = (productPrice, priceRange) => {
    switch (priceRange) {
      case 'Under $100':
        return productPrice < 100;
      case '$100 - $150':
        return productPrice >= 100 && productPrice <= 150;
      case 'Over $150':
        return productPrice > 150;
      default:
        return true;
    }
  };

  const matchesSizeFilter = (product, selectedSizes) => {
    if (selectedSizes.length === 0) return true;
    return product.sizes?.some(size => selectedSizes.includes(size)) || false;
  };

  const matchesColorFilter = (product, selectedColors) => {
    if (selectedColors.length === 0) return true;
    return product.colors?.some(color => 
      selectedColors.some(selectedColor => 
        color.toLowerCase().includes(selectedColor.toLowerCase())
      )
    ) || false;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const genderParam = urlParams.get('gender');
    const categoryParam = urlParams.get('category');

    if (['men', 'women', 'kids', 'featured'].includes(genderParam)) {
      setGender(genderParam);
    } else if (location.state?.gender) {
      setGender(location.state.gender);
    }

    if (categoryParam) {
      setCategory(categoryParam.toLowerCase());
    }
  }, [location]);

  useEffect(() => {
    if (category) {
      const categoryText = category.charAt(0).toUpperCase() + category.slice(1);
      document.title = `Puma | ${categoryText}`;
    } else {
      document.title = "Puma";
    }
  }, [category]);
  
  // Reset products to show when filters change
  useEffect(() => {
    setProductsToShow(12);
  }, [selectedSizes, selectedColors, selectedPrices, isBestSeller, sortBy, gender, category]);

  const filteredProducts = () => {
    if (!data) return [];

    let products = [...data]; 

    products = products.filter(
      (product) => categoryIds[gender]?.includes(product.category.id)
    );

    if (category) {
      products = products.filter(
        (product) => product.category.slug.toLowerCase() === category
      );
    }

    if (isBestSeller) {
      products = products.filter(product => product.stock > 100);
    }

    if (selectedSizes.length > 0) {
      products = products.filter(product => matchesSizeFilter(product, selectedSizes));
    }

    if (selectedColors.length > 0) {
      products = products.filter(product => matchesColorFilter(product, selectedColors));
    }

    if (selectedPrices.length > 0) {
      products = products.filter(product =>
        selectedPrices.some(priceRange => matchesPriceRange(product.price, priceRange))
      );
    }

    // Sorting logic
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0)); 
        break;
      default:
        products.sort((a, b) => {
          const aIsBestSeller = a.stock > 100 ? 1 : 0;
          const bIsBestSeller = b.stock > 100 ? 1 : 0;
          return bIsBestSeller - aIsBestSeller;
        });
        break;
    }

    return products;
  };
  
  const getBreadcrumbs = () => (
    <nav className="text-sm text-gray-600 mb-8 container mx-2.5 md:mx-auto pt-8 inter-Puma">
      <Link className='hover:text-gray-900 hover:font-medium' to="/">Home</Link>
      <span className="mx-2">·</span>
      <Link to={`/categorypage?gender=${gender}`} className="capitalize hover:text-gray-900 hover:font-medium">
        {gender}
      </Link>
      <span className="mx-2">·</span>
      <span className="capitalize ">{category}</span>
    </nav>
  );

  const getPageTitle = () => {
    const genderText = gender.charAt(0).toUpperCase() + gender.slice(1);
    const categoryText = category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "Shoes and Sneakers";
    return `${genderText}'s ${categoryText}`;
  };

  const getActiveFilterCount = () => {
    return selectedSizes.length + selectedColors.length + selectedPrices.length + (isBestSeller ? 1 : 0);
  };

  const getGridClasses = () => {
    return gridColumns === 2 
      ? 'grid-cols-1 sm:grid-cols-2' 
      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
  };

  const getCardClasses = () => {
    return gridColumns === 2 
      ? 'max-w-none' 
      : 'max-w-sm';
  };

  const filteredProductsData = filteredProducts();
  const currentProducts = filteredProductsData.slice(0, productsToShow); // Changed: Show only up to productsToShow
  const hasMoreProducts = filteredProductsData.length > productsToShow; // Changed: Check if there are more products than currently shown

  const handleLoadMore = () => {
    setProductsToShow(prev => prev + 12); // Changed: Add 12 more products to show
  };

  return (
    <div>
      {getBreadcrumbs()}

      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-wide container mx-2.5 md:mx-auto">
        {getPageTitle()}
      </h1>

      <div className="">
        <div className="mx-2 md:mx-0 h-25 flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4 sticky top-[79px] bg-white border-gray-300 border-x-0 border-[1px] inter-Puma z-40">
          <div className="mt-2.5 flex-wrap flex justify-between items-center w-full container mx-auto">
            {/* filter */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 relative"
              >
                <span>FILTERS</span>
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6h10M6 12h14M8 18h12" />
                </svg>
              </button>

              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              )}

              <span className="text-gray-600 text-sm">
                {filteredProductsData.length} products
              </span>
            </div>

            <div className="flex items-center gap-4">
              

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-1 md:mt-0 appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 hover:bg-gray-50 transition-colors duration-200"
                >
                  <option value="newest">SORT BY</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Newest</option>
                  <option value="featured">Best Rating</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            

          </div>
        </div>
        <div className="container mx-auto relative ">
          {/* Grid Button */}
              <div className="flex items-center gap-2 p-1 absolute right-3">
                <button
                  onClick={() => setGridColumns(2)}
                  className={`p-2 rounded transition-colors duration-200 border-[1px] border-gray-400  ${
                    gridColumns === 2 
                      ? 'bg-[#181818] text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  title="2 Columns"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  className={`p-2 rounded transition-colors duration-200 border-[1px] border-gray-400 ${
                    gridColumns === 4 
                      ? 'bg-[#181818] text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  title="4 Columns"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h4v4H3V3zm6 0h4v4H9V3zm6 0h4v4h-4V3zM3 9h4v4H3V9zm6 0h4v4H9V9zm6 0h4v4h-4V9zM3 15h4v4H3v-4zm6 0h4v4H9v-4zm6 0h4v4h-4v-4z"/>
                  </svg>
                </button>
              </div>
        </div>
        {showFilters && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 sticky top-44 z-40">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div>
                <h3 className="font-semibold mb-3">Popular</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={isBestSeller}
                        onChange={(e) => setIsBestSeller(e.target.checked)}
                        className="mr-2" 
                      />
                      {isBestSeller && (
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <span className={`transition-colors duration-200 ${isBestSeller ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                      Best seller 
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`border rounded px-2 py-1 transition-all duration-300 transform hover:scale-105 ${
                        selectedSizes.includes(size)
                          ? 'border-[#181818] bg-[#181818] text-white shadow-lg ring-2 ring-gray-200'
                          : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map(price => (
                    <label key={price} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={selectedPrices.includes(price)}
                          onChange={() => togglePrice(price)}
                          className="mr-2" 
                        />
                        {selectedPrices.includes(price) && (
                          <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <span className={`transition-colors duration-200 ${selectedPrices.includes(price) ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`border rounded px-3 py-1 transition-all duration-300 transform hover:scale-105 relative flex items-center gap-2 ${
                        selectedColors.includes(color.name)
                          ? 'border-gray-200 bg-black text-white shadow-lg ring-2 ring-gray-200'
                          : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${color.bg} ${
                        selectedColors.includes(color.name) ? 'ring-2 ring-white' : ''
                      }`}></div>
                      <span className="text-sm">{color.name}</span>
                      {selectedColors.includes(color.name) && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Product Grid */}
      <div className="container mx-auto py-8 inter-Puma mt-15">
        <div className={`grid ${getGridClasses()} `}>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Failed to load products.</p>
          ) : currentProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button 
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2 bg-[#181818] text-white rounded-md hover:bg-black transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            currentProducts.map((product) => (
              <Link 
                key={product.id}
                to={`/details/${product.slug}`}
                state={{ product }}
                className={`rounded-lg transition-shadow ${getCardClasses()} relative`}
              >
                {/* Bestseller badge */}
                {product.stock > 100 && (
                  <div className="absolute top-6 left-6 bg-blue-500 text-white text-[8px] sm:text-xs px-2 py-1  z-10 font-semibold">
                    BESTSELLER
                  </div>
                )}
                
                <div className="relative aspect-square">
                  <img 
                    src={product.images?.[0].url} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                
                <div className={`p-4 space-y-2 ${gridColumns === 2 ? 'md:p-6' : ''}`}>
                  <p className={`text-gray-400 uppercase tracking-wide ${
                    gridColumns === 2 ? 'text-sm md:text-base' : 'md:text-sm text-[10px]'
                  }`}>
                    {product.colors[0]}
                  </p>
                  
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h2 className={`font-medium text-gray-900 leading-tight line-clamp-2 break-words ${
                        gridColumns === 2 ? 'text-lg md:text-xl' : 'md:text-lg text-[14px]'
                      }`}>
                        {product.name}
                      </h2>
                      <p className={`text-gray-500 mt-1 truncate ${
                        gridColumns === 2 ? 'text-sm md:text-base' : 'text-[10px] md:text-sm'
                      }`}>
                        {product.category.name}
                      </p>
                    </div>

                    <p className={`font-semibold text-gray-900 ml-2 whitespace-nowrap ${
                      gridColumns === 2 ? 'text-lg md:text-xl' : 'md:text-lg text-[10px]'
                    }`}>
                      ${product.price}
                    </p>
                </div>

                </div>
              </Link>
            ))
          )}
        </div>

        {hasMoreProducts && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default All;