import toast from "react-hot-toast";
import { BiCopy } from "react-icons/bi";

interface CardProps {
  url: string;
  slug: string;
  description: string;
  className?: string;
}

const Card = (props: CardProps) => {
  const copyToClipboard = async (txt: string) => {
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([txt], { type: "text/plain" }),
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      await navigator.clipboard.writeText(txt);
    }
    toast("Copied to clipboard", {
      icon: "🚀",
      style: {
        borderRadius: "10px",
        borderColor: "#fff",
        background: "#222222",
        color: "#fff",
      },
    });
  };

  return (
    <div
      className={`bg-midnight border border-zinc-800 rounded-lg  hover:shadow-lg transition-all p-4 ${props.className}`}
    >
      <div className="flex items-center">
        <a
          className="text-gray-100 text-xl hover:text-gray-300 transition-all"
          target="_blank"
          rel="noreferrer"
          href={`https://slug.vercel.app/s/${props.slug}`}
        >
          /s/{props.slug}
        </a>
        <button
          className="p-1 ml-1 text-gray-500 hover:text-gray-200 transition-colors duration-200"
          onClick={() =>
            copyToClipboard(`https://slug.vercel.app/s/${props.slug}`)
          }
        >
          <BiCopy className="mr-2" />
        </button>
      </div>
      <p className="truncate text-gray-500 mb-2">{props.url}</p>
      <p className="text-gray-400">{props.description}</p>
    </div>
  );
};

export default Card;
