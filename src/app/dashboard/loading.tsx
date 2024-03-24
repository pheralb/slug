import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="mt-14 flex flex-col items-center text-neutral-500 dark:text-neutral-400 animate-in fade-in-20 duration-100">
      <LoaderIcon size={20} className="animate-spin" />
      <p className="mt-2">Loading...</p>
    </div>
  );
};

export default Loading;
