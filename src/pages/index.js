import Blog from 'src/container/Blog';
import { useEffect } from "react";
import { tempStorage } from "../utils/storage";

export default function Home() {
  useEffect(() => {
   typeof window.localStorage.setItem('ActiveMenu', 'blog');
  }, []);
  return (
    <>
      <Blog/>
      {/* <h2>Hello</h2> */}
    </>
  )
}
