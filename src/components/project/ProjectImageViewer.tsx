import { useProject } from "../../hooks/useProject";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectImageViewer() {
  const { state, dispatch } = useProject();

  const closeModal = () => {
    dispatch({ type: "clear-selected-image" });
  };

 const showNext = () => {
    dispatch({ type: "next-selected-image", payload: { project: state.selected! } });
  };

  const showPrevious = () => {
    dispatch({ type: "previous-selected-image", payload: { project: state.selected! } });
  };

  if (!state.selectedImage) return null;

  const { src, alt, type } = state.selectedImage;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          showPrevious();
        }}
        className="absolute left-6 md:left-12 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full z-50"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={24} />
      </button>

    <div
      className="relative w-full max-w-[95vw] h-auto max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden p-4 sm:p-6 md:p-7"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        aria-label="Cerrar modal"
        className="absolute top-2 right-2 text-white text-2xl font-bold"
      >
        <X />
      </button>

      {type === "image" ? (
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[75vh] object-contain rounded"
        />
      ) : (
        <video
          src={src}
          controls
          autoPlay
          className="w-full max-h-[75vh] object-contain rounded"
        />
      )}

      <p className="absolute bottom-2 left-0 right-0 text-center text-cyan-300 bg-black/60 py-1 text-sm">
        {alt}
      </p>
    </div>

    
      <button
        onClick={(e) => {
          e.stopPropagation();
          showNext();
        }}
        className="absolute right-6 md:right-12 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full z-50"
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
