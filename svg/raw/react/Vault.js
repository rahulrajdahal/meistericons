import * as React from "react";

function SvgVault(props) {
  return (
    <svg
      width={60}
      height={60}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M50 56.25H10a2.5 2.5 0 010-5h40a2.5 2.5 0 010 5z" fill="#000" />
      <path
        d="M46.725 56.25a2.5 2.5 0 01-2.5-2.5v-45h-28.45v45a2.5 2.5 0 01-5 0V6.25a2.5 2.5 0 012.5-2.5h33.45a2.5 2.5 0 012.5 2.5v47.5a2.5 2.5 0 01-2.5 2.5z"
        fill="#000"
      />
      <path
        d="M37.5 36.25h-15a2.5 2.5 0 01-2.5-2.5v-17.5a2.5 2.5 0 012.5-2.5h15a2.5 2.5 0 012.5 2.5v17.5a2.5 2.5 0 01-2.5 2.5zm-12.5-5h10v-12.5H25v12.5z"
        fill="#000"
      />
      <path
        d="M37.5 27.5h-15a2.5 2.5 0 010-5h15a2.5 2.5 0 010 5zM30 48.75a4.999 4.999 0 110-9.998 4.999 4.999 0 010 9.998z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgVault;
