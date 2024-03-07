export interface LinksProps {
  id: number;
  url: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  creatorId: string;
  folder?: string | null;
  tagId: number | null;
}
