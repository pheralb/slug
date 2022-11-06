import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { CreateLinkInput } from "@/schema/link.schema";
import { Button } from "@/styles/ui";
import { BiRocket } from "react-icons/bi";
import Loader from "@/motions/loader";
import Messages from "../messages";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

const Create = () => {
  const {
    handleSubmit,
    register,
    setValue,
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
          background: "#28283E",
          color: "#fff",
        },
      });
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = (values: CreateLinkInput) => {
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
        <div
          className="flex border border-rose-500/30 rounded-lg p-4 mb-5 text-sm text-rose-500 bg-rose-500/10"
          role="alert"
        >
          <p>
            <span className="font-medium">{error.data?.code}:</span> {error.message}
          </p>
        </div>
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
        {errors.url && <Messages text={errors.url.message} className="mt-2" />}
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
        {errors.slug && (
          <Messages text={errors.slug.message} className="mt-2" />
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description (optional):</label>
        <textarea
          id="description"
          className="rounded-md px-4 py-2 w-full focus:border-none mt-1 bg-midnightLight text-white"
          {...register("description")}
        />
      </div>
      <Button type="submit" disabled={loading} className="bg-midnightLight">
        {loading ? (
          <>
            <Loader />
            <span className="ml-2">Creating your link...</span>
          </>
        ) : (
          <>
            <BiRocket className="mr-2" size={18} />
            Create your link
          </>
        )}
      </Button>
    </form>
  );
};

export default Create;
