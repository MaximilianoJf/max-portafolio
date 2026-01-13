import { useProject } from "../../hooks/useProject";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link, Card as GlassCard } from "../ui";

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
      className="fixed inset-0  backdrop-blur-2xl flex items-center justify-center z-50"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}

    >
      <Link variant="glass" circle={true} className="m-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            showPrevious();
          }}
          className=" text-foreground"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>
      </Link>

      <GlassCard variant="glass"
        className="relative w-fit  max-w-[95vw] h-auto max-h-[90vh] rounded-lg overflow-hidden p-4 sm:p-6 md:p-12 m-4"
      >
        <Link variant="glass" circle={true} className="absolute top-2 right-2">

          <button
            onClick={closeModal}
            aria-label="Cerrar modal"
          >
            <X />
          </button>
        </Link>

        <div className="relative w-[75vw] h-[70vh] overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
          {type === "image" ? (
            <img
              src={src}
              alt={alt}

              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={src}
              controls
              autoPlay
              loop

              className="w-full h-full object-cover"
            />
          )}

          <p className="absolute bottom-0 left-0 right-0 text-center text-white bg-black/60 backdrop-blur-md py-3 text-lg font-medium border-t border-white/10">
            {alt}
          </p>
        </div>
      </GlassCard>

      <Link variant="glass" circle={true} className="m-2 ">
        <button
          onClick={(e) => {
            e.stopPropagation();
            showNext();
          }}
          className="text-foreground"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>
      </Link>

    </div >
  );
}
