import { useState } from "react";
import toast from "react-hot-toast";
import { BiCopy, BiEdit, BiSlider, BiTrash } from "react-icons/bi";
import IconButton from "@/ui/iconButton";
import { Dropdown, DropdownItem } from "@/ui/dropdown";
import Modal from "@/ui/modal";
import Edit from "../functions/edit";
import Delete from "../functions/delete";

import { CardProps } from "./interface";
import { toastStyles } from "@/styles/toast";

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
      style: toastStyles,
    });
  };

  return (
    <div
      className={`flex justify-between rounded-lg border border-zinc-800 bg-midnight  p-4 transition-all hover:shadow-lg ${props.className}`}
    >
      <div className="truncate">
        <div className="flex items-center">
          <a
            className="text-xl text-gray-100 transition-all hover:text-gray-300"
            target="_blank"
            rel="noreferrer"
            href={`https://slug.vercel.app/s/${props.slug}`}
          >
            /s/{props.slug}
          </a>
          <IconButton
            icon={<BiCopy />}
            className="ml-1 p-1 text-gray-500 transition-colors duration-200 hover:text-gray-200"
            onClick={() =>
              copyToClipboard(`https://slug.vercel.app/s/${props.slug}`)
            }
          />
        </div>
        <p className="mb-2 text-gray-500">{props.url}</p>
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
