import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
// Use public URLs for better Vercel compatibility


export default component$(() => {
  return (
    <div class="flex justify-center items-center h-screen bg-gray-100 ">
      <div class="relative w-full h-full max-w-full max-h-full shadow-lg overflow-hidden ">
        <video
          src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/Deepal%20(2).mp4"
          autoplay
          muted
          loop
          playsInline
          class="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/Frame%201000005212%20(1).png"
          alt="Overlay"
          loading="lazy"
          class="absolute top-1/3 left-1/2 w-50 h-50 md:w-50 lg:w-60  2xl:w-90 -translate-x-1/2 -translate-y-1/2 "
        />
        <Link href = "/front_invitation">
          <img
          src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/btnopen.png"
          loading="lazy"
          alt= "Overlay"
          class="absolute top-1/2 left-1/2 w-30 h-auto pt-10 cursor-pointer animate-zoom"
          
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
