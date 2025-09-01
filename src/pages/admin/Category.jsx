import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import AddCategory from '../../components/admin/category/AddCategory';
import EditCategory from '../../components/admin/category/EditCategory';
import Modal from '../../components/ui/Modal';
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from '../../store/API';

const Category = () => {
  const [modalType, setModalType] = useState(null); 
  const [edit, setEdit] = useState(null);

  const { data, refetch } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Kateqoriyanı sil',
        text: 'Kateqoriya silindikdən sonra geri qaytarıla bilməz!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      });

      if (result.isConfirmed) {
        await deleteCategory(id).unwrap();
        toast.success('Kateqoriya silindi!');
        refetch();
      }
    } catch (error) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleEdit = (item) => {
    setEdit(item);
    setModalType('edit');
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEdit(null);
    refetch();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <button
          onClick={() => setModalType('add')}
          className="px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
        >
          Add New Category
        </button>
      </div>

      {/* Modals */}
      <Modal open={modalType === 'add'} setOpen={handleCloseModal}>
        <AddCategory setOpen={handleCloseModal} />
      </Modal>

      <Modal open={modalType === 'edit'} setOpen={handleCloseModal}>
        <EditCategory setOpen={handleCloseModal} item={edit} />
      </Modal>

      {/* Category List */}
      <ul className="space-y-4">
        {data?.map((item, index) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-4 bg-[#1f1f1f] text-white rounded-xl shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-white text-black font-bold rounded-full">
                {index + 1}
              </div>
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-sm text-gray-400">{item.slug}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
