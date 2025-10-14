import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
// Use public URL for better Vercel compatibility
const video2 = "/video2.mp4";

export default component$(() => {
  const nav = useNavigate(); // Renamed to `nav` to avoid confusion

  return (
    <div class="w-full h-full max-w-full max-h-full shadow-lg overflow-hidden h-screen">
      <video
        src={video2}
        autoplay
        muted
        playsInline
        onEnded$={() => {
          console.log("Video ended, navigating...");
          nav("/Bophan_SreyNeang"); // ✅ Correct way
        }}
        class="absolute w-full h-full object-contain outline-none"
      />
    </div>
  );
});
