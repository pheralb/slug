"use client";

import type { Links, Tags } from "@/generated/client";
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
import { LoaderIcon, LockIcon, LockOpenIcon, SaveIcon, CalendarIcon, EyeIcon, EyeOffIcon, TrashIcon } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

interface EditLinkProps {
  trigger: ReactNode;
  link: Links;
  linkTags: Tags[];
  allTags: Tags[];
}

const EditLink = (props: EditLinkProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const [unlockSlug, setUnlockSlug] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Main form:
  const form = useForm<z.infer<typeof EditLinkSchema>>({
    resolver: zodResolver(EditLinkSchema),
    defaultValues: {
      id: props.link.id,
      url: props.link.url,
      slug: props.link.slug,
      description: props.link.description ?? "",
      expiresAt: props.link.expiresAt ? new Date(props.link.expiresAt) : null,
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

      // If not any changes in the tags, return:
      toast.success("Link edited successfully.", {
        description: `Url: https://slu9.vercel.app/${values.slug}`,
        duration: 10000,
        closeButton: true,
      });
      form.reset();
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
        <DialogHeader className="overflow-hidden">
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription className="block truncate">
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
                          disabled={unlockSlug}
                        />
                        {unlockSlug ? (
                          <Popover>
                            <PopoverTrigger className="absolute bottom-0 right-0 top-0 flex items-center px-3">
                              <LockIcon size={16} />
                            </PopoverTrigger>
                            <PopoverContent className="max-w-72 text-sm">
                              <p className="mb-2">
                                Editing the custom link will remove access from
                                the previous link and it will be available to
                                everyone. Are you sure you want to continue?
                              </p>
                              <Button
                                onClick={() => setUnlockSlug(false)}
                                variant="outline"
                                className="w-full"
                              >
                                <LockOpenIcon size={16} />
                                <span>Unlock</span>
                              </Button>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setUnlockSlug(true)}
                            className="absolute bottom-0 right-0 top-0 flex items-center px-3"
                          >
                            <LockOpenIcon size={16} />
                          </button>
                        )}
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
                        defaultValue={props.link.description ?? "Description"}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password {props.link.password && "(Active)"}:
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <LockIcon size={14} className="absolute left-3 text-neutral-500" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pl-9 pr-10"
                          // Use defaultValue if not controlled, but we are using controlled field from react-hook-form
                          placeholder={props.link.password ? "Change password" : "Set password"}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-0 flex h-full items-center px-3 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                          {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    {props.link.password && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-auto p-0 text-xs text-red-500 hover:bg-transparent hover:text-red-600"
                        onClick={() => form.setValue("password", "", { shouldDirty: true })}
                      >
                        <TrashIcon size={12} className="mr-1" /> Remove Password
                      </Button>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration (optional):</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <CalendarIcon size={14} className="absolute left-3 text-neutral-500" />
                        <Input
                          type="datetime-local"
                          className="pl-9"
                          disabled={loading}
                          min={new Date().toISOString().slice(0, 16)}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!value) {
                              field.onChange(null);
                            } else {
                              field.onChange(new Date(value));
                            }
                          }}
                          value={
                            field.value instanceof Date
                              ? new Date(field.value.getTime() - field.value.getTimezoneOffset() * 60000)
                                .toISOString()
                                .slice(0, 16)
                              : ""
                          }
                        />
                      </div>
                    </FormControl>
                    {field.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-auto p-0 text-xs text-red-500 hover:bg-transparent hover:text-red-600"
                        onClick={() => form.setValue("expiresAt", null, { shouldDirty: true })}
                      >
                        <TrashIcon size={12} className="mr-1" /> Remove Expiration Date
                      </Button>
                    )}
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
