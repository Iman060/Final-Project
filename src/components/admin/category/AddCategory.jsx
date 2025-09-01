import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useAddCategoryMutation, useGetAllCategoriesQuery } from "../../../store/API";

const AddCategory = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState(null);

  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery();

  const handleSaveCategory = async () => {
    if (!name || !slug) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun");
      return;
    }

    try {
      await addCategory({ name, slug, parentId }).unwrap();
      toast.success("Category successfully added");
      setName("");
      setSlug("");
      setParentId(null);
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong while adding the category.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add category name..."
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Add category slug..."
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Parent Category (optional)</label>
        <select
          value={parentId || ""}
          onChange={(e) =>
            setParentId(e.target.value === "" ? null : Number(e.target.value))
          }
          className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="">None (Top-level category)</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
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

export default AddCategory;
