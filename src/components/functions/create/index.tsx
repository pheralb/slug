import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { CreateLinkInput } from "@/schema/link.schema";
import { BiRefresh, BiRocket } from "react-icons/bi";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import Button from "@/ui/button";
import Alert from "@/ui/alert";
import { toastStyles } from "@/styles/toast";

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

  const { mutate } = trpc.links.createLink.useMutation({
    onSuccess: () => {
      router.push(`/dash`);
      setLoading(false);
      toast("Link created successfully", {
        icon: "🥳",
        style: toastStyles,
      });
    },
    onError: () => {
      setLoading(false);
      setError("slug", {
        type: "manual",
        message: "Slug already exists. Please try another one or click 'Randomize' button.",
      });
    },
  });

  const onSubmit = (values: CreateLinkInput) => {
    // Check if slug & url are equals to prevent infinite redirect =>
    if (values.slug === values.url) {
      setError("url", {
        type: "manual",
        message: "The URL and the slug cannot be the same",
      });
      return;
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
      <div className="mb-5">
        <label htmlFor="url">Enter the URL here:</label>
        <input
          id="url"
          type="text"
          placeholder="https://"
          className="mt-1 w-full rounded-md bg-midnightLight px-4 py-2 text-white focus:border-none"
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
                "Please enter a valid URL. It should start with https://.",
            },
          })}
        />
        {errors.url && <Alert className="mt-2">{errors.url.message}</Alert>}
      </div>
      <div className="mb-5">
        <label htmlFor="slug">Custom slug:</label>
        <p className="text-gray-500">https://slug.vercel.app/s/</p>
        <div className="mt-1 flex items-center justify-between">
          <input
            id="slug"
            type="text"
            placeholder="Custom slug"
            className="w-full rounded-md bg-midnightLight px-4 py-2 text-white focus:border-none"
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
            icon={<BiRefresh size={17} />}
          >
            Randomize
          </Button>
        </div>
        {errors.slug && <Alert className="mt-2">{errors.slug.message}</Alert>}
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description (optional):</label>
        <textarea
          id="description"
          className="mt-1 w-full rounded-md bg-midnightLight px-4 py-2 text-white focus:border-none"
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
