import { useProject } from "../../hooks/useProject";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link, Card as GlassCard } from "../ui";

export default function ProjectImageViewer() {
  const { state, dispatch } = useProject();

  const closeModal = () => dispatch({ type: "clear-selected-image" });
  const showNext = () => dispatch({ type: "next-selected-image", payload: { project: state.selected! } });
  const showPrevious = () => dispatch({ type: "previous-selected-image", payload: { project: state.selected! } });

  if (!state.selectedImage) return null;

  const { src, alt, type } = state.selectedImage;

  return (
    <div
      className="fixed inset-0 backdrop-blur-3xl bg-black/40 flex items-center justify-center z-[100] p-4"
      onClick={closeModal}
    >

      <div className="hidden md:block">
        <Link variant="glass" circle={true} className="m-4 text-background">
          <button onClick={(e) => { e.stopPropagation(); showPrevious(); }} className="p-2 cursor-pointer">
            <ChevronLeft size={32} />
          </button>
        </Link>
      </div>

      <GlassCard
        variant="glass"
        className="relative w-full max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw] h-auto max-h-[92vh] rounded-3xl overflow-hidden p-3 sm:p-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="absolute top-4 right-4 z-50">
          <Link variant="glass" circle={true}>
            <button onClick={closeModal} className="p-1 text-background cursor-pointer"><X size={20} /></button>
          </Link>
        </div>

        <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10">
          {type === "image" ? (
            <img src={src} alt={alt} className="w-full h-full object-contain" />
          ) : (
            <video src={src} controls autoPlay loop className="w-full h-full object-contain" />
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-3 border-t border-white/10">
            <p className="text-center text-white/90 text-sm sm:text-base font-medium">{alt}</p>
          </div>
        </div>

        <div className="flex md:hidden items-center justify-center gap-8 mt-6 w-full">
          <Link variant="glass" circle={true}>
            <button onClick={showPrevious} className="p-3 text-background cursor-pointer">
              <ChevronLeft size={28} />
            </button>
          </Link>


          <Link variant="glass" circle={true}>
            <button onClick={showNext} className="p-3 text-background cursor-pointer">
              <ChevronRight size={28} />
            </button>
          </Link>
        </div>
      </GlassCard>

      <div className="hidden md:block">
        <Link variant="glass" circle={true} className="m-4">
          <button onClick={(e) => { e.stopPropagation(); showNext(); }} className="p-2 text-background cursor-pointer">
            <ChevronRight size={32} />
          </button>
        </Link>
      </div>
    </div>
  );
}