import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useEditBrandMutation } from "../../../store/API";

const EditBrand = ({ setOpen, item }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editBrand, { isLoading }] = useEditBrandMutation();

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setSlug(item.slug || "");
    }
  }, [item]);

  const handleSaveBrand = async () => {
    if (!name || !slug) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun");
      return;
    }

    try {
      await editBrand({ params: { name, slug }, id: item.id }).unwrap();
      toast.success("Brand successfully edited");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong while editing the brand.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Edit brand name..."
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Edit brand slug..."
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveBrand}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditBrand;
