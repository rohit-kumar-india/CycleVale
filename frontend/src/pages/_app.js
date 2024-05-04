import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Head from 'next/head';
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {

  const router = useRouter()
  const path = router.pathname;
  return (
    <>
      {path !== "/Login" && path !== "/Signup" && <Navbar />}
      <Head>
        <title>CycleVale</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ToastContainer />
      {path !== "/Login" && path !== "/Signup" && <Footer />}
    </>
  )
}