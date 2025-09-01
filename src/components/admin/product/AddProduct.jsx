import { useState, useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductByIdQuery,
  useGetAllCategoriesQuery,
  useGetAllBrandsQuery,
  useUploadImageMutation,
} from "../../../store/API";

const AddProduct = ({ setOpen, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brandId: "",
    colors: [],
    sizes: [],
    images: [],
    categoryId: "",
    slug: "",
  });

  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const { data: products } = useGetProductByIdQuery(edit, { skip: !edit });
  
  useEffect(() => {
    if (edit && products?.product) {
      const product = products.product;
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price ? String(product.price) : "",
        stock: product.stock ? String(product.stock) : "10",
        brandId: product.brandId?.toString() || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        images: product.images?.map(img => img.id) || [],
        categoryId: product.categoryId?.toString() || "",
        slug: product.slug || "",
      });
      
      if (product.images && product.images.length > 0) {
        setImagePreviews(product.images.map(img => ({
          id: img.id,
          url: img.url,
          isExisting: true,
        })));
      }
    }
  }, [edit, products]);

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "name" && { slug: generateSlug(value) })
    }));
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !formData.colors.includes(colorInput.trim())) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, colorInput.trim()] }));
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter(c => c !== color) }));
  };

  const handleAddSize = () => {
    if (sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, sizeInput.trim()] }));
      setSizeInput("");
    }
  };

  const handleRemoveSize = (size) => {
    setFormData(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }));
  };

  const handleFile = async (e) => {
  const files = Array.from(e.target.files);
  for (const file of files) {
    const formDataData = new FormData();
    formDataData.append("image", file);
    try {
      const result = await uploadImage(formDataData).unwrap();
      if (result?.id && result?.url) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, result.id],
        }));
        setImagePreviews((prev) => [
          ...prev,
          {
            id: result.id,
            url: result.url,
            isExisting: false,
          },
        ]);
      }
      toast.success(result?.message || "Image uploaded successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Image upload failed");
    }
  }
  e.target.value = "";
};



  const handleRemoveImage = (index) => {
    const imageToRemove = imagePreviews[index];
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter(id => id !== imageToRemove.id) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        brandId: Number(formData.brandId),
        categoryId: Number(formData.categoryId),
      };

      let result;
      if (edit) {
        result = await editProduct({ params: productPayload, id: edit }).unwrap();
      } else {
        result = await addProduct(productPayload).unwrap();
      }

      toast.success(edit ? "Product updated successfully!" : "Product added successfully!");
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Product submission failed");
    }
  };
  return (
    <div className="bg-[#1f1f1f] text-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
          {edit ? "Edit Product" : "Add New Product"}
        </h2>
        
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="product-slug"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-2">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0"
            />
          </div>

          {/* Category */}
          
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue=""
            >
              <option disabled value="">Select Subcategory</option>
              {categories?.map((parent) =>
                parent.children?.map((child) => (
                  <option key={child.id} value={child.id}>
                    {parent.name} › {child.name}
                  </option>
                ))
              )}
            </select>
          </div>
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium mb-2">Brand *</label>
            <select
              name="brandId"
              value={formData.brandId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Brand</option>
              {(Array.isArray(brands) ? brands : brands?.brands || []).map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}

            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter product description"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium mb-2">Colors</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter color"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.colors.map((color, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-[#2c2c2c] rounded-full text-sm"
              >
                {color}
                <button
                  type="button"
                  onClick={() => handleRemoveColor(color)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium mb-2">Sizes</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter size"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.sizes.map((size, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-[#2c2c2c] rounded-full text-sm"
              >
                {size}
                <button
                  type="button"
                  onClick={() => handleRemoveSize(size)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Images</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-gray-400">
                Click to upload images or drag and drop
              </span>
              <span className="text-sm text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </span>
            </label>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  {preview.isExisting && (
                    <span className="absolute bottom-1 left-1 bg-blue-600 text-xs px-2 py-1 rounded text-white">
                      Existing
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isAdding || isEditing || isUploading}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md font-semibold flex items-center gap-2"
          >
            {(isAdding || isEditing || isUploading) && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isUploading ? "Uploading images..." : edit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;