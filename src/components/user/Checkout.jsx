import { useState } from 'react';
import { useGetBasketQuery } from '../../store/API';
import { Link } from 'react-router';

const Checkout = () => {
  const { data: basketItems = [], isLoading, isError } = useGetBasketQuery();
  const cartItems = basketItems.length > 0 && basketItems[0].items ? basketItems[0].items : [];
  
  const [orderDetailsExpanded, setOrderDetailsExpanded] = useState(false);
  const [promoCodeExpanded, setPromoCodeExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    postalCode: '',
    state: '',
    country: 'United States',
    email: '',
    phoneNumber: '',
    smsUpdates: false
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [billingAddressSame, setBillingAddressSame] = useState(true);

  const isLoggedIn = localStorage.getItem('token');
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Please Login</h1>
            <p className="text-gray-600 mb-8">You need to be logged in to access checkout</p>
            <button className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (isError || !cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add items to your cart before proceeding to checkout</p>
            <button className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-900 transition-colors">
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      alert("Please enter a promo code");
      return;
    }

    if (promoCode.trim().toLowerCase() === "iman060") {
      setAppliedPromoCode("iman060")
      setPromoCode(""); 
      setPromoCodeExpanded(false)
    } else {
      alert("Invalid promo code")
    }
  }

  const handleRemovePromoCode = () => {
    setAppliedPromoCode('');
    alert('Promo code removed');
  };

  const getProductPrice = (item) => {
    const price = item.product?.price || 0;
    return isNaN(parseFloat(price)) ? 0 : parseFloat(price);
  };

  const calculateSubtotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    
    return cartItems.reduce((total, item) => {
      const price = getProductPrice(item);
      const quantity = item.quantity || 1; 
      return total + (price * quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    if (appliedPromoCode) {
      return calculateSubtotal() * 0.1; // 10% discount
    }
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = shippingMethod === 'standard' ? 0 : 
                    shippingMethod === 'expedited' ? 25 : 35;
    return subtotal - discount + shipping;
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    return `$${numPrice.toFixed(2)}`;
  };

  const getTotalItemsCount = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.quantity || 1);
    }, 0);
  };

  const getShippingPrice = (method) => {
    switch (method) {
      case 'standard': return '$0.00';
      case 'expedited': return '$25.00';
      case 'next-business': return '$35.00';
      default: return '$0.00';
    }
  };

  const handleContinueToPayment = () => {
    const required = ['firstName', 'lastName', 'streetAddress', 'city', 'postalCode', 'state', 'email'];
    const missing = required.filter(field => !shippingForm[field].trim());

    if (missing.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
        <div className="min-h-screen bg-white">
        <div className="pt-12 pb-8">
          <div className="max-w-2xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium">
                  1
                </div>
                <span className="text-gray-700">Delivery</span>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium">
                  2
                </div>
                <span className="text-gray-700">Review & Pay</span>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                  3
                </div>
                <span className="text-gray-600">Complete</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">Secure Checkout</h2>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 mb-10">
          <div className="text-center max-w-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Thank You for Your Order!</h1>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">Order Confirmed!</h2>
              <p className="text-green-700 text-sm">Order #12345678 • Placed on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="text-left mb-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h3>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Order Processing</h4>
                  <p className="text-gray-600 text-sm">We're preparing your order for shipment. This usually takes 1-2 business days.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Shipping & Tracking</h4>
                  <p className="text-gray-600 text-sm">Once shipped, you'll receive a tracking number via email and SMS to monitor your package.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Delivery</h4>
                  <p className="text-gray-600 text-sm">Your order will arrive at your specified address within 3-5 business days.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Questions about your order? Our customer service team is here to help you Monday through Friday, 9AM to 6PM EST.
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">Contact Support</a>
                <span className="text-gray-300">|</span>
                <a href="/faq" className="text-blue-600 hover:text-blue-800 font-medium">View FAQ</a>
              </div>
            </div>

            <div className="space-y-3">
              <a 
                href="/"
                className="block w-full bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors rounded"
              >
                CONTINUE SHOPPING
              </a>
              
              <a 
                href="/account/orders"
                className="block w-full bg-white border border-gray-300 text-gray-700 px-8 py-3 font-semibold hover:bg-gray-50 transition-colors rounded"
              >
                VIEW ORDER DETAILS
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-6">CHECKOUT</h1>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center space-x-8 mb-8">
            <button 
              className={`pb-2 font-semibold border-b-2 border-black text-black `}
            >
              CART
            </button>
            <button 
              
              className={`pb-2 font-semibold text-gray-400`}
            >
              SHIPPING
            </button>
            <button 
              onClick={() => setActiveTab('PAYMENT')}
              className={`pb-2 font-semibold text-gray-400`}
            >
              PAYMENT
            </button>
            <button 
              onClick={() => setActiveTab('SUMMARY')}
              className={`pb-2 font-semibold text-gray-400`}
            >
              SUMMARY
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">For Faster Checkout Experience</h2>
              <div className="flex space-x-4 mb-4">
                <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-blue-600">PayPal</span>
                </button>
                <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <span className="font-semibold">G Pay</span>
                </button>
              </div>
              <p className="text-sm text-gray-600">
                By continuing, I confirm that I have read and accepted the Terms and Conditions and the Privacy Policy.
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-lg mb-4">1. SHIPPING & BILLING</h3>
              
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Enter A Shipping Address</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">FIRST NAME *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingForm.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LAST NAME *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingForm.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">STREET NUMBER AND NAME OR P.O. BOX *</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={shippingForm.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Street Number and Name or P.O. BOX"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">APARTMENT, COMPANY, APT, SUITE, UNIT</label>
                  <input
                    type="text"
                    name="apartment"
                    value={shippingForm.apartment}
                    onChange={handleInputChange}
                    placeholder="Specify Company, Apt, Suite, Unit"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">CITY *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingForm.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">POSTAL CODE *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingForm.postalCode}
                      onChange={handleInputChange}
                      placeholder="Postal code"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">STATE *</label>
                    <select
                      name="state"
                      value={shippingForm.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">COUNTRY *</label>
                    <select
                      name="country"
                      value={shippingForm.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>
                </div>

                {/* Contact */}
                <h4 className="font-semibold mb-4">Enter Contact Info</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingForm.email}
                      onChange={handleInputChange}
                      placeholder="E-mail:000@gmail.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={shippingForm.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="smsUpdates"
                      checked={shippingForm.smsUpdates}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Please send me SMS shipping updates about my order</span>
                  </label>
                </div>

                <h4 className="font-semibold mb-4">Select a Shipping Method</h4>
                
                <div className="space-y-3 mb-6">
                  <label className="flex items-center justify-between p-3 border border-gray-300 rounded cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span>Standard</span>
                    </div>
                    <span>$0.00</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-gray-300 rounded cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value="expedited"
                        checked={shippingMethod === 'expedited'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span>Expedited</span>
                    </div>
                    <span>$25.00</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-gray-300 rounded cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value="next-business"
                        checked={shippingMethod === 'next-business'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span>Next Business Day</span>
                    </div>
                    <span>$35.00</span>
                  </label>
                </div>

                <h4 className="font-semibold mb-4">Enter a Billing Address</h4>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={billingAddressSame}
                      onChange={(e) => setBillingAddressSame(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Billing and Shipping details are the same</span>
                  </label>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full bg-[#181818] text-gray-100 py-4 font-bold hover:bg-gray-100 hover:text-[#181818] transition-colors"
                >
                  CONTINUE TO PAYMENT
                </button>

                <p className="text-xs text-gray-600 mt-4">
                  By continuing, I confirm that I have read and accepted the Terms and Conditions and the Privacy Policy.
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              {/* Order Details */}
              <div className="mb-6">
                <button 
                  onClick={() => setOrderDetailsExpanded(!orderDetailsExpanded)}
                  className="w-full flex justify-between items-center font-semibold py-2"
                >
                  <span>ORDER DETAILS ({getTotalItemsCount()})</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${orderDetailsExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {orderDetailsExpanded && (
                  <div className="mt-4 space-y-4">
                    {cartItems.map((item, index) => {
                      const productPrice = getProductPrice(item);
                      const productSlug = item.product?.slug
                      const quantity = item.quantity || 1;
                      
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded border">
                          <img
                            src={item.product?.images?.[0]?.url || '/placeholder-image.jpg'}
                            alt={item.product?.name || 'Product'}
                            className="w-16 h-16 object-contain border border-gray-200 rounded"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.jpg';
                            }}
                          />
                          <div className="flex-grow">
                            <Link to={`/details/${productSlug}`} className="hover:underline font-medium text-sm">{item.product?.name || 'Unknown Product'}</Link>
                            <p className="text-xs text-gray-600 capitalize">{item.product?.category?.name || 'Category'}</p>
                            {item.color && item.color !== 'default' && (
                              <p className="text-xs">Color: {item.color}</p>
                            )}
                            {item.size && item.size !== 'default' && (
                              <p className="text-xs">Size: {item.size}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">{formatPrice(productPrice)}</p>
                            <p className="text-xs text-gray-600">Qty: {quantity}</p>
                          </div>
                          
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <button 
                  onClick={() => setPromoCodeExpanded(!promoCodeExpanded)}
                  className="w-full flex justify-between items-center text-left font-semibold py-2"
                >
                  <span>APPLY A PROMO CODE</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${promoCodeExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {promoCodeExpanded && (
                  <div className="mt-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter a promo code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                      />
                      <button
                        onClick={handleApplyPromoCode}
                        disabled={!promoCode.trim()}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded transition-colors"
                      >
                        APPLY
                      </button>
                    </div>
                  </div>
                )}
                
                {appliedPromoCode && (
                  <div className="flex items-center justify-between text-green-600 text-sm mt-2 bg-green-50 p-2 rounded">
                    <span>Promo code "{appliedPromoCode}" applied!</span>
                    <button 
                      onClick={handleRemovePromoCode}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>FREE RETURNS ON ALL QUALIFYING ORDERS</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>SHIPPING COSTS</span>
                  <span>{getShippingPrice(shippingMethod)}</span>
                </div>
                
                {appliedPromoCode && calculateDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>DISCOUNT</span>
                    <span>-{formatPrice(calculateDiscount())}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>ESTIMATED SALES TAX</span>
                  <span>—</span>
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>ESTIMATED TOTAL</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600 mb-4">
                <p>Or 4 payments of {formatPrice(calculateTotal() / 4)} by afterpay or klarna</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;