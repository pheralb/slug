import { useState } from "react";
import toast from "react-hot-toast";
import { BiCopy, BiEdit, BiSlider, BiTrash } from "react-icons/bi";
import IconButton from "@/ui/iconButton";
import { Dropdown, DropdownItem } from "@/ui/dropdown";
import Modal from "@/ui/modal";
import Edit from "../functions/edit";
import Delete from "../functions/delete";

interface CardProps {
  id: number;
  url: string;
  slug: string;
  description: string;
  className?: string;
}

const Card = (props: CardProps) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

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
      className={`flex justify-between bg-midnight border border-zinc-800 rounded-lg  hover:shadow-lg transition-all p-4 ${props.className}`}
    >
      <div className="truncate">
        <div className="flex items-center">
          <a
            className="text-gray-100 text-xl hover:text-gray-300 transition-all"
            target="_blank"
            rel="noreferrer"
            href={`https://slug.vercel.app/s/${props.slug}`}
          >
            /s/{props.slug}
          </a>
          <IconButton
            icon={<BiCopy />}
            className="p-1 ml-1 text-gray-500 hover:text-gray-200 transition-colors duration-200"
            onClick={() =>
              copyToClipboard(`https://slug.vercel.app/s/${props.slug}`)
            }
          />
        </div>
        <p className="text-gray-500 mb-2">{props.url}</p>
        <p className="text-gray-400">{props.description}</p>
      </div>
      <div>
        <Dropdown
          title="Options"
          className="bg-transparent text-gray-300 hover:text-white"
          icon={<BiSlider size={17} />}
        >
          <DropdownItem
            icon={<BiCopy size={17} />}
            onClick={() =>
              copyToClipboard(`https://slug.vercel.app/s/${props.slug}`)
            }
          >
            Copy
          </DropdownItem>
          <DropdownItem icon={<BiEdit size={17} />} onClick={handleEditModal}>
            Edit
          </DropdownItem>
          <DropdownItem
            icon={<BiTrash size={17} />}
            onClick={handleDeleteModal}
          >
            Delete
          </DropdownItem>
        </Dropdown>
        <Modal
          title={`Edit: /s/${props.slug}`}
          open={editModal}
          close={handleEditModal}
        >
          <Edit
            id={props.id}
            slug={props.slug}
            url={props.url}
            description={props.description}
          />
        </Modal>
        <Modal
          title={`Delete: /s/${props.slug}`}
          open={deleteModal}
          close={handleDeleteModal}
        >
          <Delete id={props.id} />
        </Modal>
      </div>
    </div>
  );
};

export default Card;
