import * as React from "react";

function SvgNotepad(props) {
  return (
    <svg
      width={60}
      height={60}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M43.75 56.25h-27.5a10 10 0 01-10-10v-27.5a10 10 0 0110-10h27.5a10 10 0 0110 10v27.5a10 10 0 01-10 10zm-27.5-42.5a5 5 0 00-5 5v27.5a5 5 0 005 5h27.5a5 5 0 005-5v-27.5a5 5 0 00-5-5h-27.5z"
        fill="#000"
      />
      <path
        d="M20 18.75a2.5 2.5 0 01-2.5-2.5v-10a2.5 2.5 0 015 0v10a2.5 2.5 0 01-2.5 2.5zm10 0a2.5 2.5 0 01-2.5-2.5v-10a2.5 2.5 0 015 0v10a2.5 2.5 0 01-2.5 2.5zm10 0a2.5 2.5 0 01-2.5-2.5v-10a2.5 2.5 0 015 0v10a2.5 2.5 0 01-2.5 2.5z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgNotepad;
