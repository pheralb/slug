"use client";

import type { Tags } from "@/generated/client";
import { type ReactNode, useState } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import { removeTag } from "@/server/actions/tags";
import { Button } from "@/ui/button";
import { LoaderIcon } from "lucide-react";

interface DeleteTagProps {
  tag: Tags;
  trigger: ReactNode;
}

const DeleteTag = ({ trigger, tag }: DeleteTagProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteTag = async () => {
    try {
      setLoading(true);
      await removeTag(tag.id);
      setOpen(false);
      toast.success("Link deleted successfully.", {
        description: `The tag ${tag.name} has been deleted.`,
      });
    } catch (error) {
      toast.error(
        "An error occurred while deleting the tag. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete "{tag.name}" tag</DialogTitle>
          <DialogDescription>
            Delete the tag will not delete the links associated with it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDeleteTag}
            disabled={loading}
          >
            {loading ? <LoaderIcon size={16} /> : "Delete Tag"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTag;
