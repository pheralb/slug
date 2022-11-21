import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { CreateLinkInput } from "@/schema/link.schema";
import { BiRocket } from "react-icons/bi";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import { Button } from "@/ui";
import Alert from "@/ui/alert";

const Create = () => {
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CreateLinkInput>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["links.create-link"], {
    onSuccess: () => {
      router.push(`/dash`);
      setLoading(false);
      toast("Link created successfully", {
        icon: "🥳",
        style: {
          borderRadius: "10px",
          background: "#121212",
          color: "#fff",
        },
      });
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = (values: CreateLinkInput) => {
    const areEquals = values.url === values.slug;
    if (areEquals) {
      return setError("slug", {
        message: "The original URL and the custom URL cannot be the same",
      });
    }
    setLoading(true);
    mutate(values);
  };

  const handleGenerateRandomSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomSlug = nanoid(6);
    setValue("slug", randomSlug);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert>
          <p>{error.message}</p>
        </Alert>
      )}
      <div className="mb-5">
        <label htmlFor="url">Enter the URL here:</label>
        <input
          id="url"
          type="text"
          placeholder="https://"
          className="rounded-md px-4 py-2 w-full focus:border-none mt-1 bg-midnightLight text-white"
          {...register("url", {
            required: {
              value: true,
              message: "Please enter a URL.",
            },
            minLength: {
              value: 8,
              message:
                "Please enter a valid URL. It should be at least 8 characters long.",
            },
            pattern: {
              value: /^https?:\/\//i,
              message:
                "Please enter a valid URL. It should start with http:// or https://",
            },
          })}
        />
        {errors.url && <Alert className="mt-2">{errors.url.message}</Alert>}
      </div>
      <div className="mb-5">
        <label htmlFor="slug">Custom slug:</label>
        <p className="text-gray-500">https://slug.vercel.app/s/</p>
        <div className="flex items-center justify-between mt-1">
          <input
            id="slug"
            type="text"
            placeholder="Custom slug"
            className="rounded-md px-4 py-2 w-full focus:border-none bg-midnightLight text-white"
            {...register("slug", {
              required: {
                value: true,
                message: "Please enter a custom slug or generate a random.",
              },
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/i,
                message:
                  "Please enter a valid slug without blank spaces or special characters.",
              },
            })}
          />
          <Button
            onClick={handleGenerateRandomSlug}
            className="ml-2 bg-midnightLight"
          >
            Random
          </Button>
        </div>
        {errors.slug && <Alert className="mt-2">{errors.slug.message}</Alert>}
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description (optional):</label>
        <textarea
          id="description"
          className="rounded-md px-4 py-2 w-full focus:border-none mt-1 bg-midnightLight text-white"
          {...register("description")}
        />
      </div>
      <Button
        type="submit"
        isLoading={loading}
        loadingText="Creating your link..."
        icon={<BiRocket size={18} />}
      >
        Create your link
      </Button>
    </form>
  );
};

export default Create;
