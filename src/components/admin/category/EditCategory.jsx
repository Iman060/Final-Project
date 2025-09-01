import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useEditCategoryMutation } from "../../../store/API";

const EditCategory = ({ setOpen, item }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editCategory, { isLoading }] = useEditCategoryMutation();

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setSlug(item.slug || "");
    }
  }, [item]);

  const handleSaveCategory = async () => {
    if (!name || !slug) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun");
      return;
    }

    try {
      await editCategory({ params: { name, slug }, id: item.id }).unwrap();
      toast.success("Category successfully edited");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong while editing the category.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Edit category name..."
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Edit category slug..."
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveCategory}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
