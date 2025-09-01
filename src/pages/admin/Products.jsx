import { Loader2, Pen, Trash, Package, DollarSign, Palette, Ruler } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../store/API";
import AddProduct from "../../components/admin/product/AddProduct";

const Products = () => {
  const { data, isLoading } = useGetProductQuery()
  const [open, setOpen] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const [edit, setEdit] = useState(null);
  
  const handleDeleteProduct = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete Product",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteProduct(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "The product was successfully deleted!",
          icon: "success",
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong...");
    }
  };

  const handleEditProduct = (id) => {
    setEdit(id);
    setOpen(true);
  };

  return (
    <div className="bg-[#181818] text-white p-4 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Products</h2>
            <p className="text-gray-400">Manage your product inventory</p>
          </div>
          <button
            onClick={() => {
              setEdit(null); 
              setOpen(true);
            }}
            className="md:px-6 md:py-3 py-1 bg-white text-[12px] md:text-[16px] transition-all duration-300 rounded-lg font-semibold text-[#181818] shadow-lg transform hover:bg-gray-300"
          >
            Add New Product
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Products</p>
                    <p className="text-white text-2xl font-bold">{data?.length || 0}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">In Stock</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.filter(p => p.stock > 0).length || 0}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Low Stock</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.filter(p => p.stock > 0 && p.stock <= 10).length || 0}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-orange-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Out of Stock</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.filter(p => p.stock === 0).length || 0}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-red-200" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-[#1f1f1f] border border-gray-700 rounded-xl overflow-hidden shadow-lg  transform  transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-800">
                    <img
                      className="w-full h-full object-cover"
                      src={product.images?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg shadow-lg transform  transition-all duration-200"
                      >
                        <Pen className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg shadow-lg transform  transition-all duration-200"
                      >
                        <Trash className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      {product.stock === 0 ? (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Out of Stock
                        </span>
                      ) : product.stock <= 10 ? (
                        <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          In Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {product.slug}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-green-400">
                        ${product.price}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Stock
                        </span>
                        <span className="text-white font-medium">{product.stock}</span>
                      </div>

                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Palette className="w-4 h-4" />
                            Colors
                          </span>
                          <span className="text-white font-medium">
                            {product.colors.length}
                          </span>
                        </div>
                      )}

                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Ruler className="w-4 h-4" />
                            Sizes
                          </span>
                          <span className="text-white font-medium">
                            {product.sizes.length}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Colors Preview */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-400 mb-2">Available Colors:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.slice(0, 4).map((color, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {color}
                            </span>
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-gray-400 text-xs self-center">
                              +{product.colors.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sizes Preview */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Available Sizes:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.slice(0, 4).map((size, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 4 && (
                            <span className="text-gray-400 text-xs self-center">
                              +{product.sizes.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {data && data.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first product</p>
                <button
                  onClick={() => {
                    setEdit(null); 
                    setOpen(true);
                  }}
                  className="px-6 py-3 bg-white transition rounded-lg font-semibold text-[#181818] hover:bg-gray-300"
                >
                  Add Product
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal open={open} setOpen={setOpen}>
        <AddProduct setOpen={setOpen} edit={edit} />
      </Modal>
    </div>
  );
};

export default Products;