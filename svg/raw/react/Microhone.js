import * as React from "react";

function SvgMicrohone(props) {
  return (
    <svg
      width={60}
      height={60}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30 43.225A13.15 13.15 0 0116.875 30V16.175a13.125 13.125 0 1126.25 0V30A13.152 13.152 0 0130 43.225zm0-35.2a8.15 8.15 0 00-8.125 8.15V30a8.125 8.125 0 1016.25 0V16.175A8.15 8.15 0 0030 8.025z"
        fill="#000"
      />
      <path
        d="M40.625 56.975h-21.25a2.5 2.5 0 010-5H27.5v-11.25a2.5 2.5 0 015 0v11.25h8.125a2.5 2.5 0 010 5zm0-35.475H33.25a2.5 2.5 0 010-5h7.375a2.5 2.5 0 010 5zm0 9.4H33.25a2.5 2.5 0 010-5h7.375a2.5 2.5 0 010 5z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgMicrohone;
