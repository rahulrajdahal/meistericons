import * as React from "react";

function Pie(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="currentColor" width={24} height={24} {...props}><path d="M30 55a25 25 0 110-49.999A25 25 0 0130 55zm0-45a20 20 0 100 40 20 20 0 000-40z" /><path d="M52.5 32.5H30a2.5 2.5 0 01-2.5-2.5V7.5a2.5 2.5 0 015 0v20h20a2.5 2.5 0 010 5z" /></svg>;
}

export default Pie;