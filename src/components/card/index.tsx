import React from "react";
import { BiLinkAlt, BiLinkExternal } from "react-icons/bi";

interface CardProps {
  url: string;
  slug: string;
  description: string;
  className?: string;
}

const Card = (props: CardProps) => {
  return (
    <div
      className={`bg-midnightLight rounded-lg shadow-sm p-4 ${props.className}`}
    >
      <a
        className="text-gray-200 text-xl"
        href={`https://slug.vercel.app/s/${props.slug}`}
      >
        /s/{props.slug}
      </a>
      <div className="flex items-center mb-3 text-gray-400">
        <BiLinkAlt />
        <p className="truncate ml-1">{props.url}</p>
      </div>
      <p className="text-gray-400">{props.description}</p>
    </div>
  );
};

export default Card;
