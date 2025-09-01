import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useGetProductQuery, useAddToBasketMutation } from '../../store/API';
import { toast } from 'react-toastify';
import Random from '../../components/ui/Random';
import TrendingNow from '../../components/ui/TrendingNow';


const Details = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useGetProductQuery();
  const [addToBasket, { isLoading: isAddingToCart }] = useAddToBasketMutation();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isLoggedIn = localStorage.getItem('token');

  const handleWheel = (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
  setZoomLevel(newZoom);
};

const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
    resetZoom();
  };

  const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname])
    
  const product = location.state?.product || 
    (products && slug ? products.find(p => p.slug === slug) : null);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  useEffect(() => {
    if (product) {
      const categoryText = product.category?.name
        ? product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1)
        : "";
      document.title = `Puma | ${product.name}`;
    } else {
      document.title = "Puma";
    }
  }, [product]);

  if (isError || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Product not found</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const categoryIds = {
    featured: [15],
    women: [19, 20, 21], 
    men: [23, 24, 25],
    kids: [28]
  };

  const getGender = () => {
    if (categoryIds.women.includes(product.category?.id)) {
      return 'women';
    } else if (categoryIds.men.includes(product.category?.id)) {
      return 'men';
    } else if (categoryIds.kids.includes(product.category?.id)) {
      return 'kids';
    } else {
      return 'men';
    }
  };

  const getBreadcrumbs = () => {
    const gender = getGender();
    const category = product.category?.slug;

    return (
      <nav className="mx-2.5 md:mx-auto text-sm text-gray-600 mb-8 container pt-8 inter-Puma">
        <Link className='hover:text-gray-900 hover:font-medium' to="/">Home</Link>
        <span className="mx-2">·</span>
        <Link to={`/categorypage?gender=${gender}`} className="hover:text-gray-900 hover:font-medium capitalize">
          {gender}
        </Link>
        <span className="mx-2">·</span>
        <Link className="capitalize hover:text-gray-900 hover:font-medium" to={`/all?gender=${gender}&category=${category}`}>{category}</Link>
        <span className="mx-2">·</span>
        <span>{product.name}</span>
      </nav>
    );
  };

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = product && storedWishlist.some(item => item.id === product.id);
    setIsInWishlist(exists);
  }, [product]);

  const addToWishlist = () => {
    if (!product) return;

    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size before adding to wishlist');
      return;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color before adding to wishlist');
      return;
    }

    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const exists = storedWishlist.some(item => item.id === product.id);
    if (exists) {
      toast.info('Item already in wishlist');
      setIsInWishlist(true);
      return;
    }

    const newWishlist = [...storedWishlist, {
      id: product.id,
      slug: product.slug,
      name: product.name,
      images: product.images,
      category: product.category,
      price: product.price,
      colors: product.colors,
      sizes: product.sizes,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
    }];

    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
    setIsInWishlist(true);
    toast.success('Added to wishlist!');
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: {
          from: location.pathname,
          message: 'Please sign in to add items to your cart.',
        },
      });
      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    try {
      await addToBasket({
        productId: product.id,
        quantity,
        color: selectedColor || 'default',
        size: selectedSize || 'default',
      }).unwrap();

      toast.success(`Added ${quantity} item(s) to cart!`);

      if (window.confirm('Item added to cart! View your cart now?')) {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Add to cart failed:', error);

      if (error?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        navigate('/login', {
          state: {
            from: location.pathname,
            message: 'Your session expired. Please sign in again.',
          },
        });
      } else if (error?.status === 400) {
        const errorMessage = error.data?.message || 'Invalid request.';
        toast.error(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };



  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {getBreadcrumbs()}
      
      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex gap-8">
          {/* Product Images */}
          <div className="lg:flex-2/3">
            {product.images && product.images.length > 1 && (
            <div className="md:grid md:grid-cols-2 flex md:flex-none overflow-x-auto gap-2 md:gap-0 scroll-smooth">
              {product.images.slice(0, 6).map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className="flex-shrink-0 md:flex-shrink aspect-square overflow-hidden w-full md:w-auto snap-start"
                >
                  <img
                    src={image.url}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
            )}
          </div>

          <div className="lg:flex-1/3">
            <div className="sticky top-30 space-y-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <div>
                <h1 className="md:text-3xl text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 capitalize">{product.category?.name}</p>
                
                {/* Best Seller */}
                {product.stock > 100 && (
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded mt-2">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Color</h3>
                <p className="text-sm text-gray-600 mb-3">{selectedColor}</p>
                <div className="flex space-x-3">
                  {product.colors?.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 border-2 rounded ${
                        selectedColor === color ? 'border-black' : 'border-gray-300'
                      }`}
                      style={{
                        backgroundColor: 
                                      color.toLowerCase() === 'white' ? '#ffffff' :
                                      color.toLowerCase() === 'black' ? '#000000' :
                                      color.toLowerCase() === 'red' ? '#dc2626' :
                                      color.toLowerCase() === 'blue' ? '#2563eb' :
                                      color.toLowerCase() === 'green' ? '#16a34a' :
                                      color.toLowerCase() === 'yellow' ? '#facc15' :
                                      color.toLowerCase() === 'orange' ? '#f97316' :
                                      color.toLowerCase() === 'purple' ? '#9333ea' :
                                      color.toLowerCase() === 'pink' ? '#ec4899' :
                                      color.toLowerCase() === 'brown' ? '#78350f' :
                                      color.toLowerCase() === 'gray' ? '#9ca3af' :
                                      color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                      color.toLowerCase() === 'ivory' ? '#fffff0' :
                                      color.toLowerCase() === 'teal' ? '#0d9488' :
                                      color.toLowerCase() === 'turquoise' ? '#40e0d0' :
                                      color.toLowerCase() === 'lime' ? '#84cc16' :
                                      color.toLowerCase() === 'olive' ? '#808000' :
                                      color.toLowerCase() === 'maroon' ? '#800000' :
                                      color.toLowerCase() === 'navy' ? '#000080' :
                                      color.toLowerCase() === 'indigo' ? '#4b0082' :
                                      color.toLowerCase() === 'gold' ? '#ffd700' :
                                      color.toLowerCase() === 'silver' ? '#c0c0c0' :
                                      color.toLowerCase() === 'bronze' ? '#cd7f32' :
                                      color.toLowerCase() === 'coral' ? '#ff7f50' :
                                      color.toLowerCase() === 'salmon' ? '#fa8072' :
                                      color.toLowerCase() === 'mint' ? '#98ff98' :
                                      color.toLowerCase() === 'lavender' ? '#e6e6fa' :
                                      color.toLowerCase() === 'charcoal' ? '#36454f' :
                                      color.toLowerCase() === 'peach' ? '#ffe5b4' :
                                      color.toLowerCase() === 'mustard' ? '#ffdb58' :
                                      color.toLowerCase() === 'sand' ? '#c2b280' :
                                      color.toLowerCase() === 'sky' ? '#87ceeb' :
                                      color.toLowerCase() === 'plum' ? '#dda0dd' :
                                      color.toLowerCase() === 'emerald' ? '#50c878' :
                                      color.toLowerCase() === 'ruby' ? '#e0115f' :
                                      color.toLowerCase() === 'sapphire' ? '#0f52ba' :
                                      '#9ca3af'  
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

             
              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold">Size</h3>
                  <button className="text-sm text-gray-600 underline">
                    SIZE GUIDE
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 text-sm border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                  
                 
                </div>
              </div>

              {/* Quantity Selection */}
              {isLoggedIn && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border border-gray-300 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    onClick={addToWishlist}
                    className={`flex-shrink-0 p-3 border rounded transition-colors
                      ${isInWishlist ? 'bg-black border-black' : 'border-gray-300 hover:bg-gray-50'}
                    `}
                    aria-label={isInWishlist ? 'In wishlist' : 'Add to wishlist'}
                  >
                    <svg
                      className="w-6 h-6"
                      fill={isInWishlist ? 'white' : 'none'}
                      stroke={isInWishlist ? 'white' : 'currentColor'}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAddingToCart}
                    className="flex-1 bg-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingToCart ? 'ADDING...' : product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                  </button>

                </div>
                
                <Link 
                  to={`/all?gender=${getGender()}&category=${product.category?.slug}`}
                  className="block text-center w-full border border-gray-300 py-3 px-6 font-semibold hover:bg-gray-50"
                >
                  EXPLORE ALL {product.brand?.name?.toUpperCase() || 'BRAND'}
                </Link>
              </div>
              {!isLoggedIn && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Sign in to enjoy these benefits:</strong>
                  </p>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Add items to your cart</li>
                    <li>Save items to your wishlist</li>
                    <li>Track your orders</li>
                    <li>Get exclusive member deals</li>
                  </ul>
                  <div className="mt-3 flex space-x-2">
                    <Link
                      to="/login"
                      state={{
                        from: location.pathname,
                        message: 'Sign in to add items to your cart and enjoy member benefits.'
                      }}
                      className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      state={{
                        from: location.pathname,
                        message: 'Create an account to add items to your cart and enjoy member benefits.'
                      }}
                      className="border border-blue-600 text-blue-600 px-4 py-2 text-sm font-semibold rounded hover:bg-blue-50 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}

              {/* Shipping Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>This item qualifies for free shipping!</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Free returns on all qualifying orders.</span>
                </div>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Info */}
              {product.stock > 0 && (
                <p className="text-sm text-gray-600">
                  {product.stock} items in stock
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Details section */}
        <div className="mt-20">
          <TrendingNow />
        </div>
          
        <div className="mt-20">
          <div className="mx-auto container">
            <h2 className="text-3xl text-center font-bold mb-5">You might also like</h2>
            <Random />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#181818] z-50">
          {/* Close button */}
          <button
            onClick={() => {
              setIsModalOpen(false);
              resetZoom();
            }}
            className="absolute top-4 right-4 z-[52] text-white hover:text-gray-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {product.images.length > 1 && (
            <>
              <button
                onClick={() => {
                  const newIndex = selectedImage > 0 ? selectedImage - 1 : product.images.length - 1;
                  setSelectedImage(newIndex);
                  resetZoom();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-[52] text-white hover:text-gray-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const newIndex = selectedImage < product.images.length - 1 ? selectedImage + 1 : 0;
                  setSelectedImage(newIndex);
                  resetZoom();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[52] text-white hover:text-gray-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image counter */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-10 transform -translate-x-1/2 z-[52] text-white text-sm">
              {String(selectedImage + 1).padStart(2, '0')} — {String(product.images.length).padStart(2, '0')}
            </div>
          )}
          <div 
            className="w-full h-full flex justify-center items-center overflow-hidden relative"
            style={{ 
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={product.images[selectedImage].url}
              alt="Product preview"
              className="object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                maxWidth: 'none',
                maxHeight: 'none',
                width: '100%',
                height: '100%'
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;