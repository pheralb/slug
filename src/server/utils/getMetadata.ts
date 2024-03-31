import { load } from "cheerio";

interface MetadataResponse {
  title: string;
  description: string;
  siteUrl: string;
  site_name: string;
  image: string;
  icon: string;
  keywords: string;
}

export const getMetadata = async (url: string) => {
  try {
    const res = await fetch(url).then((result) => result.text());
    const $ = load(res);

    const title =
      ($('meta[property="og:title"]').attr("content") ?? $("title").text()) ||
      $('meta[name="title"]').attr("content");
    const description =
      $('meta[property="og:description"]').attr("content") ??
      $('meta[name="description"]').attr("content");
    const siteUrl = $('meta[property="og:url"]').attr("content");
    const site_name = $('meta[property="og:site_name"]').attr("content");
    const image =
      $('meta[property="og:image"]').attr("content") ??
      $('meta[property="og:image:url"]').attr("content");
    let icon =
      $('link[rel="icon"]').attr("href") ??
      $('link[rel="shortcut icon"]').attr("href");
    if (icon && !icon.includes("http")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const urlFromParams = new URL(siteUrl ?? url);
      icon = `${urlFromParams.origin}${icon}`;
    }
    const keywords =
      $('meta[property="og:keywords"]').attr("content") ??
      $('meta[name="keywords"]').attr("content");

    return {
      title,
      description,
      siteUrl,
      site_name,
      image,
      icon,
      keywords,
    } as MetadataResponse;
  } catch (error) {
    console.error(error);
  }
};
