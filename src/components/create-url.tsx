"use client";

export function CreatePost() {
  return (
    <h1>create form</h1>
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     createPost.mutate({ name });
    //   }}
    //   className="flex flex-col gap-2"
    // >
    //   <input
    //     type="text"
    //     placeholder="Title"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     className="w-full rounded-full px-4 py-2 text-black"
    //   />
    //   <button
    //     type="submit"
    //     className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
    //     disabled={createPost.isLoading}
    //   >
    //     {createPost.isLoading ? "Submitting..." : "Submit"}
    //   </button>
    // </form>
  );
}
