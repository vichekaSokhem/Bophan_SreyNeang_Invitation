import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { animate } from "@motionone/dom";
import { supabase } from "~/supabase/client";

// Use public URLs instead of imports for better Vercel compatibility
const video3 = "/video3.mp4";
const detail1 = "/detail1.png";
const agenda = "/agenda.png";
const agendaTittle = "/agendaTittle.png";
const ThanksLetter = "/ThanksLetter.png";
const Location = "/Location.png";
const imageLabel = "/imageLabel.png";
const image1 = "/image1.png";
const image2 = "/image2.png";
const image3 = "/image3.png";
const image4 = "/image4.png";
const image5 = "/image5.png";
const image6 = "/image6.png";
const image7 = "/image7.png";
const image8 = "/image8.png";
const image9 = "/image9.png";
const image10 = "/image10.png";
const LocationLabel = "/LocationLabel.png";
const wish = "/wish.png";
const btnSendWish = "/btnsendwish.png";
const btnsavethedate = "/btnsavethedate.png";
const savethedateimage = "/savethedateimage.png";


export default component$(() => {
  const popupState = useStore({
  selectedImage: null as string | null,
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
        duration: 1.8,
        easing: "ease-in",
        delay: index * 0.5, // stagger effect
        repeat: 0,
      }
    );
  });
    
  });
  export const ScrollToHash = component$(() => {
  useVisibleTask$(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });
  return null;
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
    <div class=" w-full h-screen overflow-hidden">
      <div class="relative w-full h-full clip-video shadow-lg overflow-y-hidden min-h-screen">
        {/* 🎥 Background Video */}
        <video
          src={video3}
          autoplay
          muted
          loop
          playsInline
          class="fixed top-0 absolute w-full h-full object-contain outline-none"
        />

        {/* 🧾 Scrollable Content Area */}
        <div class="relative z-10 w-full h-full overflow-y-auto pt-[50px] pb-[100px] left-2">
          <div id="date" class="min-h-screen flex flex-col items-center justify-start gap-3 py-5 px-4">
            <img src={detail1} alt="Image 1" class="w-90 max-w-md " />
            <img
              id="zoomBox"
              src={btnsavethedate}
              alt="Image 1"
              class=" w-30 pb-6 max-w-md cursor-pointer"
            />
            <img id="popup" src={savethedateimage} alt="Image 1" class="w-96 max-w-md " />
            <img id="popup" src={agendaTittle} alt="Image 1" class="w-70 max-w-md " />
            <img id="popup" src={agenda} alt="Image 1" class="w-70 max-w-md " />
            <br id="location"/>
            <img
              id="ZoomBox"
              src={LocationLabel}
              alt="Image 1"
              class=" w-30 max-w-md cursor-pointer"
            />
            <img id="popup" src={Location} alt="Image 1" class="w-70 max-w-md " />
            
            <img id="popup" src={ThanksLetter} alt="Image 1" class="w-70 max-w-md " />
            <br id="images" />
            <img  id="popup" src={imageLabel} alt="Image 1" class="w-70 max-w-md " />

            <div class="w-70 flex flex-col gap-2">
              <div class="grid grid-cols-2 gap-2" >
                <img
                  src={image1}
                  alt="Img 1"
                  class="w-40 h-20 rounded shadow-md animate-fade-up animate-duration-1000 animate-delay-300" 
                  onClick$={() => (popupState.selectedImage = image1)}
                />
                <img
                  src={image2}
                  alt="Img 2"
                  class="w-40 h-20 rounded shadow-md animate-fade-up animate-duration-1000 animate-delay-300"
                  onClick$={() => (popupState.selectedImage = image2)}
                />
              </div>
              <div class="grid grid-cols-1 gap-2">
                <img
                  src={image10}
                  alt="Img 1"
                  class="w-100 h-auto rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image10)}
                />
              </div>
              <div class="grid grid-cols-3 gap-2">
                <img
                  src={image3}
                  alt="Img 3"
                  class="w-60 h-30 rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image3)}
                />
                <img
                  src={image5}
                  alt="Img 5"
                  class="w-60 h-30 rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image5)}
                />
                <img
                  src={image4}
                  alt="Img 4"
                  class="w-60 h-30 rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image4)}
                />
              </div>
              <div class="grid grid-cols-1 gap-2">
                <img
                  src={image9}
                  alt="Img 1"
                  class="w-100 h-auto rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image9)}
                />
              </div>
              <div class="grid grid-cols-3 gap-2">
                <img
                  src={image6}
                  alt="Img 3"
                  class="w-60 h-30 rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image6)}
                />
                <img
                  src={image7}
                  alt="Img 5"
                  class="w-60 h-30 rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image7)}
                />
                <img
                  src={image8}
                  alt="Img 4"
                  class="w-60 h-30 rounded shadow-md"
                  onClick$={() => (popupState.selectedImage = image8)}
                />
              </div>
            </div>
            <img id="wish" src={wish} alt="Wish" class="w-70 max-w-md " />
            {/* Comment Form */}
            <form
              preventdefault:submit
              onSubmit$={handleSubmit}
              class="space-y-3 w-70 max-w-md"
            >
              <div class="bg-white rounded-lg p-2">
                <label class="block text-yellow-700 text-sm">Name</label>
                <input
                  type="text"
                  value={state.name}
                  onInput$={$(
                    (e) => (state.name = (e.target as HTMLInputElement).value)
                  )}
                  class="w-full focus:outline-none bg-transparent"
                />
              </div>
              <div class="bg-white rounded-lg p-2">
                <label class="block text-yellow-700 text-sm">Comment</label>
                <textarea
                  rows={2}
                  value={state.text}
                  onInput$={$(
                    (e) =>
                      (state.text = (e.target as HTMLTextAreaElement).value)
                  )}
                  class="w-full focus:outline-none bg-transparent"
                />
              </div>
              <button type="submit" class="flex justify-center w-full">
                <img id="zoomBox" src={btnSendWish} class="w-30 max-w-md cursor-pointer" />
              </button>
            </form>

            {/* Comments List */}
            <div class="w-70 max-w-md mt-4 space-y-3">
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
        
        <div class="absolute bottom-0 left-2 w-full shadow-lg z-20">
          <ScrollToHash />
          <div class="flex justify-center gap-x-8 items-center py-2">
            {/* Calender Section */}
            <a
              href="#date" preventdefault:click={false}
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
              href="#location" preventdefault:click={false}
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
              href="#images" preventdefault:click={false}
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
              href="#wish" preventdefault:click={false}
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
