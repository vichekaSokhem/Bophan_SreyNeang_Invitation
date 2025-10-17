import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { animate } from "@motionone/dom";
import { supabase } from "~/supabase/client";

export default component$(() => {
  const images = [
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-18_00-20-52.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-18_00-18-36.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-18_00-18-20.jpg", 
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-17_23-25-06.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-17_23-26-07.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_22-05-46.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-18_00-28-46.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_21-55-04.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_22-01-27.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_21-54-53.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-17_23-28-09.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_22-07-52.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-18_00-26-02.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-18_00-20-20.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-18_00-20-23.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_22-18-30.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_21-55-25.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-16_21-55-37.jpg",
  "https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/photo_2025-10-15_21-25-07.jpg",

];

  const popupState = useStore({
  selectedImage: null as string | null,
  isOpen: false,
  currentIndex: 0,
});
  useVisibleTask$(() => {
    animate(
      "#zoomBox",
      { scale: [1, 1.1, 1] },
      {
        duration: 2,
        easing: "ease-in-out",
        repeat: Infinity,
      }
    );
    const images = document.querySelectorAll("#popup,#popup img, #images img, .grid img");
  images.forEach((img, index) => {
    animate(
      img,
      { y: [100, -10, 0], opacity: [0, 1, 1] }, // slide up + fade in
      {
        duration: 1.3,
        easing: "ease-in",
        delay: index * 0.5, // stagger effect
        repeat: 0,
      }
    );
  });
    
  });
  // Store for comments
  const state = useStore({
    comments: [] as {
      id: number;
      name: string | null;
      text: string | null;
      created_at: string;
    }[],
    name: "",
    text: "",
    loading: true,
    error: null as string | null,
  });

  // Load comments on client
  useVisibleTask$(async () => {
    try {
      console.log("Loading comments from Supabase...");
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        state.error = error.message;
      } else {
        console.log("Comments loaded:", data);
        state.comments = data ?? [];
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
      state.error = "Failed to load comments";
    } finally {
      state.loading = false;
    }
  });

  // Submit comment
  const handleSubmit = $(async () => {
    if (!state.text.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      console.log("Submitting comment...");
      const { data, error } = await supabase
        .from("comments")
        .insert([{ name: state.name || null, text: state.text }])
        .select();

      if (error) {
        console.error("Error submitting comment:", error);
        alert(`Error: ${error.message}`);
      } else if (data && data[0]) {
        console.log("Comment submitted successfully:", data[0]);
        state.comments.push(data[0]);
        state.name = "";
        state.text = "";
      }
    } catch (err) {
      console.error("Failed to submit comment:", err);
      alert("Failed to submit comment");
    }
  });

  return (
    <div class=" w-full h-full overflow-hidden">
      <div class="relative w-full h-full clip-video shadow-lg overflow-y-hidden m-h-screen">
        {/* 🎥 Background Video */}
        <video
          src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/IMG_0447.MP4"
          autoplay
          muted
          loop
          playsInline
          class="fixed top-0 absolute inset-0 w-full h-full object-cover"
        />

        {/* 🧾 Scrollable Content Area */}
        <div class="relative z-10 w-full h-full overflow-y-auto pt-[50px] pb-[100px] ">
          <div id="date" class="min-h-screen flex flex-col items-center justify-center gap-3 py-5">
            <img loading="lazy" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/Detail.png" alt="Image 1" class="px-10" />
            <img
              id="zoomBox"
              loading="lazy"
              src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/btnsavethedate.png"
              alt="Image 1"
              class=" w-[140px] mb-5 cursor-pointer"
              onClick$={() => {
              const url =
                "https://calendar.google.com/calendar/render?action=TEMPLATE" +
                "&text=Bophan+SreyNeang+Wedding+Day" +
                "&dates=20251203/20251204" +
                "&details=We+joyfully+invite+you+to+celebrate+our+wedding+day!+Join+us+for+ceremony,+dinner,+and+dancing." +
                "&location=Kompong+Thom, +Cambodia";
              window.open(url, "_blank");
            }}
            />
            <img id="popup" loading="lazy" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/image1.jpg" alt="Image 1" class="w-full " />
            <img id="popup" loading="lazy" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/event.png" alt="Image 1" class="w-75 h-full" />
            <img id="popup" loading="lazy" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/Frame%201000005223%20(1).png" alt="Image 1" class="px-20 " />
            <br id="location"/>
            <a href="https://maps.app.goo.gl/xkFJD17yLJLT5tP16?g_st=ipc">
              <img
              id="ZoomBox"
              loading="lazy"
              src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/location.png"
              alt="Image 1"
              class=" w-75 h-full object-contain cursor-pointer"
            />
            </a>
            <a href="https://maps.app.goo.gl/xkFJD17yLJLT5tP16?g_st=ipc">
              <img id="popup" loading="lazy" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/qr_download%20(1).png" alt="Image 1" class="px-20 " />
            </a>

            <img id="popup" loading="lazy" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/Thanks%20Letter.png" alt="Image 1" class="px-20   " />
            <br id="images" />
            <img  id="popup" loading="lazy" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/gallery.png" alt="Image 1" class="w-75 h-full " />

            <div id="images"  class="grid grid-cols-2 sm:grid-cols-2 gap-2 " >
  {images.map((url, index) => {
    const isFullWidth = index % 3 === 0; // every 3rd image (0, 3, 6, 9...) full width

    return (
      <img
        key={index}
        src={url}
        alt={`Image ${index + 1}`}
        loading="lazy"
        class={{
          // shared styles
          "rounded shadow-md cursor-pointer hover:opacity-80 transition w-full h-auto object-cover": true,
          // make it full width across both columns
          "col-span-2": isFullWidth,
        }}
        onClick$={() => {
          popupState.currentIndex = index;
          popupState.isOpen = true;
        }}
      />
    );
  })}
</div>

            {popupState.isOpen && (
  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
    <button
      class="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded"
      onClick$={() => (popupState.isOpen = false)}
    >
      ✕
    </button>

    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl"
      onClick$={() =>
        (popupState.currentIndex =
          (popupState.currentIndex - 1 + images.length) % images.length)
      }
    >
      ‹
    </button>

    <img
      src={images[popupState.currentIndex]}
      alt={`Image ${popupState.currentIndex + 1}`}
      class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg transition-transform duration-300"
    />

    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl"
      onClick$={() =>
        (popupState.currentIndex =
          (popupState.currentIndex + 1) % images.length)
      }
    >
      ›
    </button>
  </div>
)}


            <img id="wish" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/wish%20(1).png" alt="Wish" class="w-70  " />
            {/* Comment Form */}
            <form
              preventdefault:submit
              onSubmit$={handleSubmit}
              class="w-full px-20 space-y-3"
            >
              <div class="w-full bg-white rounded-lg p-2">
                <label for="fname" class="block text-yellow-700 text-sm">Name</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={state.name}
                  onInput$={$(
                    (e) => (state.name = (e.target as HTMLInputElement).value)
                  )}
                  class="focus:outline-none bg-transparent"
                />
              </div>
              <div class="w-full bg-white rounded-lg p-2">
                <label for="fcomment" class="block text-yellow-700 text-sm">Comment</label>
                <textarea
                  rows={2}
                  id="fcomment"
                  name="fcomment"
                  value={state.text}
                  onInput$={$(
                    (e) =>
                      (state.text = (e.target as HTMLTextAreaElement).value)
                  )}
                  class=" focus:outline-none bg-transparent"
                />
              </div>
              <button type="submit" class="flex justify-center w-full">
                <img id="zoomBox" src="https://smghbdljkdvluvyzqfwr.supabase.co/storage/v1/object/public/Images/Bride&Groom/videos/btnsendwish.png" class="w-30 max-w-md cursor-pointer" />
              </button>
            </form>

            {/* Comments List */}
            <div class="w-full px-20  mt-4 space-y-3">
              {state.loading && (
                <div class="bg-white/80 p-3 rounded-lg shadow-md text-center">
                  <p class="text-yellow-800">Loading comments...</p>
                </div>
              )}

              {state.error && (
                <div class="bg-red-100 p-3 rounded-lg shadow-md text-center">
                  <p class="text-red-700">Error: {state.error}</p>
                </div>
              )}

              {!state.loading &&
                !state.error &&
                state.comments.length === 0 && (
                  <div class="bg-white/80 p-3 rounded-lg shadow-md text-center">
                    <p class="text-yellow-800">
                      No comments yet. Be the first to comment!
                    </p>
                  </div>
                )}

              {state.comments.map((c) => (
                <div key={c.id} class="flex flex-col gap-y-3 bg-white/80 p-3 rounded-lg shadow-md">
                  <div class="flex items-center justify-center gap-2 mb-1">
                    <div class= "text-yellow-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10 22a8 8 0 1 1 0-16a8 8 0 0 1 0 16m0-2a6 6 0 1 0 0-12a6 6 0 0 0 0 12m3-5a3 3 0 0 1-6 0zm-5-2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4 0a1 1 0 1 1 0-2a1 1 0 0 1 0 2m6.625-5c-.827-.18-3.375-1.59-3.375-4.125a1.875 1.875 0 0 1 3.375-1.125A1.875 1.875 0 0 1 22 3.875C22 6.41 19.452 7.82 18.625 8"/></svg>
                    </div>
                    <div>
                      <p class="font-bold text-yellow-800">
                      {c.name ?? "Anonymous"}
                    </p>
                    </div>
                  </div>
                  <hr class= "border-yellow-800"/>
                  <div class="flex items-center justify-center gap-x-3">
                    <div>
                      <p class="text-yellow-800 text-center">"{c.text ?? "(No comment)"}"</p>
                    </div>
                    <div class= "text-yellow-800">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9h10l-1.69-3.2l-.03-.22c0-.29.12-.55.32-.74l.77-.74l4.2 4.9c.27.26.43.61.43 1v6.5c0 .77-.7 1.5-1.5 1.5h-4.36c-.61 0-1.14-.35-1.34-.85l-2.2-4.94L7.47 11H3a1 1 0 0 1-1-1a1 1 0 0 1 1-1m16 9v-8h3v8z"/></svg>
                    </div>
                  </div>
                  <p class="text-xs text-yellow-800 text-center mt-1">
                    {new Date(c.created_at).toLocaleString('en-US', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </p>
                  
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📌 Bottom Navbar (inside background) */}
        
        <div class=" items-center fixed bottom-0 w-full shadow-lg z-20">
          <div class="flex justify-center md:justify-center gap-x-8 items-center py-4">
            {/* Calender Section */}
            <a
              href="#date" preventdefault:click={false} onClick$={() => {
              const el = document.querySelector('#date');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
              class="w-13 h-13 bg-yellow-800/80 text-white rounded-xl flex items-center justify-center shadow-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 19c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-8H2zM19 4h-2V3c0-.6-.4-1-1-1s-1 .4-1 1v1H9V3c0-.6-.4-1-1-1s-1 .4-1 1v1H5C3.3 4 2 5.3 2 7v2h20V7c0-1.7-1.3-3-3-3"
                />
              </svg>
            </a>

            {/* Location Section */}
            <a
              href="#location" preventdefault:click={false} onClick$={() => {
              const el = document.querySelector('#location');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
              class="w-13 h-13 bg-yellow-800/80 text-white rounded-xl flex items-center justify-center shadow-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16 2A11.013 11.013 0 0 0 5 13a10.9 10.9 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.9 10.9 0 0 0 27 13A11.013 11.013 0 0 0 16 2m0 15a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4"
                />
                <circle cx="16" cy="13" r="4" fill="none" />
              </svg>
            </a>

            {/* Image Section */}
            <a
              href="#images" preventdefault:click={false} onClick$={() => {
              const el = document.querySelector('#images');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
              class="w-13 h-13 bg-yellow-800/80 text-white rounded-xl flex items-center justify-center shadow-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1" />
                  <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A1 1 0 0 1 20.5 20H4a2 2 0 0 1-2-2zm6.892 12l3.833-5.356l-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18z" />
                </g>
              </svg>
            </a>

            {/* Comment Section */}
            <a
              href="#wish" preventdefault:click={false} onClick$={() => {
              const el = document.querySelector('#wish');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
              class="w-13 h-13 bg-yellow-800/80 text-white rounded-xl flex items-center justify-center shadow-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2"
                />
                <path
                  fill="currentColor"
                  d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      {popupState.selectedImage && (
          <div
            class="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick$={() => (popupState.selectedImage = null)} // close popup on click
          >
            <img
              src={popupState.selectedImage}
              class="max-w-full max-h-full rounded-lg shadow-lg transition-transform duration-300"
            />
          </div>
        )}

    </div>
    
  );
});
