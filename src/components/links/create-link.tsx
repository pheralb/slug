"use client";

import type { z } from "zod";
import type { Tags } from "@prisma/client";

import { CreateLinkSchema } from "@/server/schemas";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import JSConfetti from "js-confetti";

import { checkIfSlugExist, createLink } from "@/server/actions/links";

import Alert from "@/ui/alert";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input, Textarea } from "@/ui/input";
import { LoaderIcon, RocketIcon, ShuffleIcon, TagsIcon } from "lucide-react";
import SelectTagsLink from "./select-tags-link";

interface CreateLinkProps {
  children: ReactNode;
  slug?: string;
  tags: Tags[];
}

export function CreateLink(props: CreateLinkProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Main form:
  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      url: "",
      slug: props.slug ?? "",
      description: "",
    },
  });

  // Add tags to the form:
  const handleAddTags = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
      return;
    }

    if (selectedTags.length >= 2) {
      toast.error("You can't add more than 2 tags to a link.");
      return;
    }
    setSelectedTags([...selectedTags, tagId]);
  };

  const handleDeleteTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
  };

  // Form Submit method:
  const onSubmit = async (values: z.infer<typeof CreateLinkSchema>) => {
    // Check if slug & url are equals to prevent infinite redirect =>
    if (values.slug === values.url) {
      setLoading(false);
      setError(true);
      setMessage("The URL and the slug cannot be the same");
      return;
    }

    try {
      setLoading(true);

      const slugExists = await checkIfSlugExist(values.slug);

      if (slugExists) {
        toast.error(
          "The slug is already exist. Write another or generate a random slug.",
        );
        return;
      }

      const result = await createLink(values);

      if (result.error && result.limit) {
        toast.info(result.error);
        return;
      }

      toast.success("Creation link disabled for now.", {
        duration: 10000,
        closeButton: true,
      });

      form.reset();
      setOpen(false);
      await generateConfetti();
    } catch (error) {
      toast.error("An unexpected error has occurred. Please try again later.");
    } finally {
      setError(false);
      setMessage("");
      setLoading(false);
    }
  };

  // Generate confetti animation:
  const generateConfetti = async () => {
    const jsConfetti = new JSConfetti();
    await jsConfetti.addConfetti({
      confettiColors: ["#fdd835", "#4caf50", "#2196f3", "#f44336", "#ff9800"],
      confettiRadius: 3,
      confettiNumber: 50,
    });
  };

  // Generate random slug:
  const handleGenerateRandomSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomSlug = Math.random().toString(36).substring(7);
    form.setValue("slug", randomSlug);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create new link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination URL:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="https://"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short link:</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          placeholder="mylink"
                          disabled={loading}
                        />
                        <Button
                          onClick={handleGenerateRandomSlug}
                          variant="outline"
                          className="absolute right-0 rounded-none rounded-br-md rounded-tr-md"
                        >
                          <ShuffleIcon size={14} />
                          <span>Randomize</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional):</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter a description"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && <Alert variant="error">{message}</Alert>}
              {props.tags.length > 0 ? (
                <SelectTagsLink
                  selectedTags={selectedTags}
                  onSelectTag={handleAddTags}
                  onDeleteTag={handleDeleteTag}
                  tags={props.tags}
                />
              ) : (
                <div className="flex items-center justify-center space-x-2 rounded-md border border-neutral-200 py-3 text-sm dark:border-neutral-800">
                  <TagsIcon size={16} />
                  <p className="font-medium">You don't have any tag created.</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <RocketIcon size={16} />
                )}
                <span>{loading ? "Creating..." : "Create"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
