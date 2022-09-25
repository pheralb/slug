import { useState } from "react";
import { Button, Input, Textarea } from "@/styles/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BiRocket } from "react-icons/bi";

const Create = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      url,
      slug,
      description,
      creatorId: session?.user?.id,
    };
    setLoading(true);
    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
      } else {
        router.push("/dash");
      }
    } catch (error) {
      console.log("there was an error submitting", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="url">Enter the URL here:</label>
        <Input
          type="text"
          id="url"
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 bg-midnightLight text-white"
          required={true}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="slug">Custom slug:</label>
        <Input
          type="text"
          id="slug"
          placeholder="Custom slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 bg-midnightLight text-white"
          required={true}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description (optional):</label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 bg-midnightLight text-white"
        />
      </div>
      <Button type="submit" disabled={loading} className="bg-midnightLight">
        <BiRocket className="mr-2" size={18} />
        {loading ? "Loading..." : "Create link"}
      </Button>
    </form>
  );
};

export default Create;
