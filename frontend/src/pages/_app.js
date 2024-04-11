import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {

  const router  = useRouter()
  const path = router.pathname;
  return (
    <>
    {path!=="/Login" && path!=="/Signup" && <Navbar/>}
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
    {path!=="/Login" && path!=="/Signup" && <Footer/>}
    </>
  )
}