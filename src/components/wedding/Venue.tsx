{/* LIGHTBOX */}
<AnimatePresence>
  {lightbox && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={() => setLightbox(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* IMAGE */}
        <div className="w-full h-full flex items-center justify-center bg-black">
          <img
            src={current.mapImage}
            alt={current.place}
            className="max-h-[90vh] w-full object-contain"
            draggable={false}
          />
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => setLightbox(false)}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-2 rounded-full backdrop-blur-md border border-white/20 transition"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* BOTTOM BAR (UNCHANGED FUNCTIONALLY) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-black/70 px-5 py-4">
          <div>
            <p className="text-[9px] uppercase text-white/60">
              {current.label}
            </p>
            <p className="text-white font-serif">{current.place}</p>
          </div>

          {/* THIS IS YOUR ORIGINAL OPEN MAP / GET DIRECTIONS BUTTON */}
          <a
            href={current.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gold text-black text-[10px] px-4 py-2 rounded-full uppercase font-semibold hover:brightness-110 transition"
          >
            <Navigation size={13} />
            Get Directions
          </a>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
