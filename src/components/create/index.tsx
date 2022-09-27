import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { trpc } from "@/utils/trpc";
import { CreateLinkInput } from "@/schema/link.schema";

import { Button, Input, Textarea } from "@/styles/ui";
import { BiRocket } from "react-icons/bi";
import Loader from "@/motions/loader";

const Create = () => {
  const { handleSubmit, register } = useForm<CreateLinkInput>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, error } = trpc.useMutation(["links.create-link"], {
    onSuccess: (data) => {
      router.push(`/link/${data.id}`);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = (values: CreateLinkInput) => {
    setLoading(true);
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{JSON.stringify(error)}</p>}
      <div className="mb-5">
        <label htmlFor="url">Enter the URL here:</label>
        <input
          id="url"
          type="text"
          placeholder="https://"
          className="rounded-md px-4 py-2 w-full focus:border-none mt-1 bg-midnightLight text-white"
          {...register("url")}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="slug">Custom slug:</label>
        <input
          id="slug"
          type="text"
          placeholder="Custom slug"
          className="rounded-md px-4 py-2 w-full focus:border-none mt-1 bg-midnightLight text-white"
          {...register("slug")}
        />
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
            Creating your link...
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
