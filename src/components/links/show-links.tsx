"use client";

interface LinksProps {
  id: number;
  url: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  creatorId: string;
  tagId: number | null;
}

interface ShowLinksProps {
  links: LinksProps[];
}

const ShowLinks = (props: ShowLinksProps) => {
  return (
    <div>
      {props.links
        .sort((a, b) => b.id - a.id)
        .map((link) => {
          return (
            <div key={link.id}>
              <div>{link.url}</div>
              <div>{link.slug}</div>
              <div>{link.description}</div>
              <div>{link.creatorId}</div>
              <div>{link.tagId}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowLinks;
