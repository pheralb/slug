import type { ComponentProps } from "react";

const Logo: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        id="r4"
        width="512"
        height="512"
        x="0"
        y="0"
        fill="url(#r5)"
        stroke="#FFF"
        strokeOpacity="100%"
        strokeWidth="0"
        paintOrder="stroke"
        rx="128"
      ></rect>
      <clipPath>
        <use xlinkHref="#r4"></use>
      </clipPath>
      <defs>
        <linearGradient
          id="r5"
          gradientTransform="rotate(45)"
          gradientUnits="userSpaceOnUse"
          style={{
            WebkitTransformOrigin: "center center",
            transformOrigin: "center center",
          }}
        >
          <stop stopColor="#1F1F1F"></stop>
          <stop offset="1"></stop>
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 512 -512 0 256 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="320"
        height="320"
        x="96"
        y="96"
        alignmentBaseline="middle"
        color="#C7C7C7"
        viewBox="0 0 16 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.25 7.75L2.539 9.654a2.692 2.692 0 103.807 3.807L8.25 11.75m3.5-3.5l1.711-1.904A2.692 2.692 0 109.654 2.54L7.75 4.25m-1 5l2.5-2.5"
        ></path>
      </svg>
    </svg>
  );
};

export default Logo;
