import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
// Use public URL for better Vercel compatibility

export default component$(() => {
  const nav = useNavigate(); // Renamed to `nav` to avoid confusion

  return (
    <div class="w-full h-full max-w-full max-h-full shadow-lg overflow-hidden h-screen">
      <video
        src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/IMG_0449.MOV"
        autoplay
        muted
        playsInline
        onEnded$={() => {
          console.log("Video ended, navigating...");
          nav("/Bophan_SreyNeang"); // ✅ Correct way
        }}
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
});
