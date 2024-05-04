import { Inter } from "next/font/google";
import Homepage from "./Homepage";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Homepage />
      <Head>
        <title>CycleVale</title>
      </Head>
    </>
  );
}
