import * as React from "react";

function CoffeeMug(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="currentColor" width={24} height={24} {...props}><path d="M30 52.5H15a10 10 0 01-10-10v-25a10 10 0 0110-10h15a10 10 0 0110 10v25a10 10 0 01-10 10zm-15-40a5 5 0 00-5 5v25a5 5 0 005 5h15a5 5 0 005-5v-25a5 5 0 00-5-5H15z" /><path d="M42.5 42.5h-5a2.5 2.5 0 010-5h5a7.5 7.5 0 000-15h-5a2.5 2.5 0 010-5h5a12.5 12.5 0 010 25zM22.5 30a2.5 2.5 0 01-2.5-2.5V10a2.5 2.5 0 015 0v17.5a2.5 2.5 0 01-2.5 2.5z" /><path d="M22.5 40a7.5 7.5 0 110-15 7.5 7.5 0 010 15zm0-10a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" /></svg>;
}

export default CoffeeMug;