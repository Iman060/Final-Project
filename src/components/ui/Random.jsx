
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../store/API";

function Random() {
  const { data: products = [], isLoading, isError } = useGetProductQuery();

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const randomProducts = shuffleArray(products).slice(0, 6);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-6 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-600">
        {randomProducts.map((product) => (
          <Link
            to={`/details/${product.slug}`} 
            key={product.id}
            className="flex-none w-72 rounded-2xl transition-all duration-300 transform cursor-pointer group"
          >
            <div className="relative h-64 rounded-t-2xl overflow-hidden">
              <img 
                  src={product.images?.[0].url} 
                  alt={product.name} 
                  className="w-full h-full object-contain "
              />
            </div>
            <div className="p-2 text-center ">
              <h3 className="text-xl font-bold text-gray-900 tracking-wider mb-3 inter-Puma">
                {product.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Random
