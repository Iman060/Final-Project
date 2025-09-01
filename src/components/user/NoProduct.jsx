import { Link } from "react-router";
import { Search } from "lucide-react";

const NoProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Search size={80} className="text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold mb-2">No Product Found</h1>
      <p className="text-gray-500 max-w-md mb-6">
        Oops! The product you're looking for doesn't exist or has been removed.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NoProduct;
