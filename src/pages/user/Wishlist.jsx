import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAddToBasketMutation } from '../../store/API';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addToBasket, { isLoading: isAddingToCart }] = useAddToBasketMutation();
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [quantities, setQuantities] = useState({});
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
    const initialSizes = {};
    const initialColors = {};
    const initialQuantities = {};
    
    storedWishlist.forEach(item => {
      initialColors[item.id] = item.selectedColor || (item.colors?.[0] || '');
      initialSizes[item.id] = item.selectedSize || '';
      initialQuantities[item.id] = 1;
    });
    
    setSelectedColors(initialColors);
    setSelectedSizes(initialSizes);
    setQuantities(initialQuantities);
  }, []);

  const removeFromWishlist = (itemId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updatedWishlist);

    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
     window.dispatchEvent(new Event("wishlistUpdated"));
     
    const newSelectedSizes = { ...selectedSizes };
    const newSelectedColors = { ...selectedColors };
    const newQuantities = { ...quantities };
    delete newSelectedSizes[itemId];
    delete newSelectedColors[itemId];
    delete newQuantities[itemId];
    setSelectedSizes(newSelectedSizes);
    setSelectedColors(newSelectedColors);
    setQuantities(newQuantities);
    
    toast.success('Removed from wishlist!');
  };

  const updateSelectedSize = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  const updateSelectedColor = (itemId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [itemId]: color
    }));
  };

  const updateQuantity = (itemId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, quantity)
    }));
  };

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: {
          from: location.pathname,
          message: 'Please sign in to add items to your cart.',
        },
      });
      return;
    }

    const selectedSize = selectedSizes[product.id];
    const selectedColor = selectedColors[product.id];
    const quantity = quantities[product.id] || 1;

    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    setLoadingItemId(product.id);

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
    } finally {
      setLoadingItemId(null);
    }
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const getColorStyle = (color) => {
    return color.toLowerCase() === 'white' ? '#ffffff' :
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
           '#9ca3af';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 container mx-auto pt-8 pb-4 inter-Puma">
        <Link className='hover:text-gray-900 hover:font-medium' to="/">Home</Link>
        <span className="mx-2">›</span>
        <span>Wishlist</span>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        {!isLoggedIn && wishlistItems.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Sign in to add items to cart
            </h3>
            <p className="text-sm text-blue-800 mb-4">
              Create an account or sign in to add wishlist items to your cart and enjoy member benefits.
            </p>
            <div className="flex space-x-3">
              <Link
                to="/login"
                state={{
                  from: location.pathname,
                  message: 'Sign in to add items to your cart and enjoy member benefits.'
                }}
                className="bg-blue-600 text-white px-6 py-2 font-semibold rounded hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                state={{
                  from: location.pathname,
                  message: 'Create an account to add items to your cart and enjoy member benefits.'
                }}
                className="border border-blue-600 text-blue-600 px-6 py-2 font-semibold rounded hover:bg-blue-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Save items you love so you can find them easily later.
            </p>
            <Link
              to="/"
              className="inline-block bg-black text-white py-3 px-8 font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <Link 
                  to={`/details/${item.slug}`}
                  state={{ item }}
                  className="block"
                >
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={item.images?.[0]?.url || '/placeholder-image.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Product Info */}
                <div className="p-4">
                  <Link 
                    to={`/details/${item.slug}`}
                    state={{ product: item }}
                    className="block"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-gray-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 capitalize">
                      {item.category?.name}
                    </p>
                  </Link>

                  {/* Price */}
                  <p className="text-lg font-bold text-gray-900 mb-3">
                    {formatPrice(item.price)}
                  </p>

                  {/* Color Selection */}
                  {item.colors && item.colors.length > 0 && (
                    <div className="mb-3">
                      <span className="text-xs text-gray-600 block mb-2">Color: {selectedColors[item.id]}</span>
                      <div className="flex flex-wrap gap-1">
                        {item.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => updateSelectedColor(item.id, color)}
                            className={`w-6 h-6 border rounded ${
                              selectedColors[item.id] === color ? 'border-black border-2' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: getColorStyle(color) }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selection */}
                  {item.sizes && item.sizes.length > 0 && (
                    <div className="mb-3">
                      <span className="text-xs text-gray-600 block mb-2">Size</span>
                      <div className="grid grid-cols-4 gap-1">
                        {item.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => updateSelectedSize(item.id, size)}
                            className={`py-1 px-2 text-xs border ${
                              selectedSizes[item.id] === size
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {isLoggedIn && (
                    <div className="mb-3">
                      <span className="text-xs text-gray-600 block mb-2">Quantity</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) - 1)}
                          className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-gray-400"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 border border-gray-300 text-xs min-w-[40px] text-center">
                          {quantities[item.id] || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
                          className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-gray-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={loadingItemId === item.id || !isLoggedIn}
                    className="w-full bg-black text-white py-2 px-4 text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingItemId === item.id ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </div>
                    ) : !isLoggedIn ? (
                      'Sign In to Add to Cart'
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-block border border-gray-300 py-3 px-8 font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;