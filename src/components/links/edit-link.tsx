"use client";

import type { Links } from "@prisma/client";
import { useState, type ReactNode } from "react";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateLink } from "@/server/actions/links";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { LoaderIcon, SaveIcon } from "lucide-react";
import Alert from "@/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input, Textarea } from "@/ui/input";
import { EditLinkSchema } from "@/server/schemas";

interface EditLinkProps {
  trigger: ReactNode;
  link: Links;
}

const EditLink = (props: EditLinkProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);

  // Main form:
  const form = useForm<z.infer<typeof EditLinkSchema>>({
    resolver: zodResolver(EditLinkSchema),
    defaultValues: {
      url: props.link.url,
      slug: props.link.slug,
      description: props.link.description ?? "",
    },
  });

  // Form Submit method:
  const onSubmit = async (values: z.infer<typeof EditLinkSchema>) => {
    // Check if slug & url are equals to prevent infinite redirect =>
    if (values.slug === values.url) {
      setLoading(false);
      setError(true);
      setMessage("The URL and the slug cannot be the same");
      return;
    }

    try {
      setLoading(true);
      await updateLink(values);
      toast.success("Link edited successfully.", {
        description: `Url: https://slug.vercel.app/${values.slug}`,
        duration: 10000,
        closeButton: true,
      });
      setOpen(false);
    } catch (error) {
      toast.error("An unexpected error has occurred. Please try again later.");
    } finally {
      setError(false);
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription className="truncate">
            /{props.link.slug}
          </DialogDescription>
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
                        placeholder={props.link.url}
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
                          placeholder={props.link.slug}
                          disabled={true}
                        />
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
                        placeholder={props.link.description ?? "Description"}

                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && <Alert variant="error">{message}</Alert>}
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
                  <SaveIcon size={16} />
                )}
                <span>{loading ? "Saving..." : "Save"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLink;
