import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="mt-14 flex w-full flex-col items-center text-neutral-500 duration-100 animate-in fade-in-20 dark:text-neutral-400">
      <LoaderIcon size={20} className="animate-spin" />
      <p className="mt-2">Loading...</p>
    </div>
  );
};

export default Loading;
