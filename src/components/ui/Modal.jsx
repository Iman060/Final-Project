import { X } from 'lucide-react'

const Modal = ({ open, setOpen, children }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300" />
      )}

      <div
        className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-[90%] max-w-xl bg-[#1f1f1f] text-white rounded-2xl shadow-2xl p-6 transition-all duration-300
        ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </>
  )
}

export default Modal
