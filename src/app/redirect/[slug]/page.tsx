import { notFound } from "next/navigation";
import { urlFromServer } from "@/server/middleware/redirect";
import { cn } from "@/utils";
import { Textarea } from "@/ui/input";
import { RouteOffIcon } from "lucide-react";
import CopyRedirectLink from "@/components/links/copy-redirect-link";

const Redirect = async ({ params }: { params: { slug: string } }) => {
  const getDataApi = await urlFromServer(params.slug);

  if (getDataApi.redirect404) {
    return notFound();
  }

  if (getDataApi.error) {
    return notFound();
  }

  return (
    <div
      className={cn(
        "container mt-12 max-w-3xl",
        "flex flex-col items-center justify-center space-y-4 p-4",
        "rounded-md border border-neutral-200 dark:border-neutral-800",
      )}
    >
      <RouteOffIcon size={30} />
      <h2 className="text-xl tracking-tight">
        Redirection to other links has been temporarily disabled.
      </h2>
      <div className="flex w-full flex-col space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-neutral-600 dark:text-neutral-400">
            URL to redirect:
          </p>
          <CopyRedirectLink slug={getDataApi.url!} />
        </div>
        <Textarea readOnly={true}>{getDataApi.url}</Textarea>
      </div>
    </div>
  );
};

export default Redirect;
