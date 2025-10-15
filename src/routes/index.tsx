import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
// Use public URLs for better Vercel compatibility
const video1 = "/video1.mp4";
const coverName = "/coverName.png";
const coverLabel = "/coverLabel.png";


export default component$(() => {
  return (
    <div class="flex justify-center items-center h-screen bg-gray-100 ">
      <div class="relative w-full h-full max-w-full max-h-full shadow-lg overflow-hidden ">
        <video
          src={video1}
          autoplay
          muted
          loop
          playsInline
          class="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src={coverName}
          alt="Overlay"
          class="absolute top-1/5 left-1/2 w-40 h-40 md:w-50 lg:w-60  2xl:w-90 -translate-x-1/2 -translate-y-1/2 "
        />
        <Link href = "/front_invitation">
          <img
          src={coverLabel}
          alt= "Overlay"
          class="absolute bottom-1/5 left-1/2 w-35 h-auto cursor-pointer animate-zoom"
          
          />
        </Link>
        <style>{`
          @keyframes zoom {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
          .animate-zoom {
            animation: zoom 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
});
