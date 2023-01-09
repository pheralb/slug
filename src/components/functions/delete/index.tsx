import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { Button } from "@/ui";
import toast from "react-hot-toast";
import Alert from "@/ui/alert";
import { BiTrash } from "react-icons/bi";
import { nanoid } from "nanoid";
import { toastStyles } from "@/styles/toast";

interface DeleteProps {
  id: number;
}

const Delete = (props: DeleteProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [validate, setValidate] = useState(String);

  useEffect(() => {
    const random = nanoid(5);
    setValidate(random);
    if (validate === random) {
      setDisabled(true);
    }
  }, []);

  const { mutate, error } = trpc.links.deleteLink.useMutation({
    onSuccess: () => {
      router.reload();
      setLoading(false);
      toast("Link deleted successfully", {
        icon: "🥳",
        style: toastStyles,
      });
    },
    onError: () => {
      setLoading(false);
      alert("Error");
    },
  });

  const onSubmit = () => {
    if (validate === getValues("validate")) {
      setLoading(true);
      mutate({
        linkId: props.id,
      });
    } else {
      toast("The values do not match. Check the validation.", {
        icon: "🤔",
        style: toastStyles,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert>
          <p>{error.message}</p>
        </Alert>
      )}
      <Alert>
        <p>
          Are you sure you want to delete this link? This action is
          irreversible.
        </p>
      </Alert>
      <div className="mb-5">
        <p>Enter the following to confirm:</p>
        <p className="text-gray-400">{validate}</p>
        <div className="mt-1">
          <input
            type="text"
            placeholder="..."
            className="w-full rounded-md bg-midnightLight px-4 py-2 text-white focus:border-none"
            {...register("validate", { required: true, maxLength: 20 })}
          />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          isLoading={loading}
          loadingText="Deleting your link..."
          icon={<BiTrash size={18} />}
        >
          Delete link
        </Button>
      </div>
    </form>
  );
};

export default Delete;
