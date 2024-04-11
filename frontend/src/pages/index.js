import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Homepage from "./Homepage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Homepage/>
    </>
  );
}
