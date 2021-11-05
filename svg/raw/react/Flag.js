import * as React from "react";

function SvgFlag(props) {
  return (
    <svg
      width={60}
      height={60}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50.35 56.425H9.65a2.5 2.5 0 010-5h40.7a2.5 2.5 0 110 5z"
        fill="#000"
      />
      <path
        d="M16.825 56.425a2.5 2.5 0 01-2.5-2.5V6.075a2.5 2.5 0 013.625-2.25L46.675 18.2a2.5 2.5 0 011.375 2.225 2.5 2.5 0 01-1.375 2.225l-27.35 13.675v17.5a2.499 2.499 0 01-2.5 2.6zM19.325 10v20.75L40 20.425 19.325 10z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgFlag;
