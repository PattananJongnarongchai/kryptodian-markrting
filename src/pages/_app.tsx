// pages/_app.tsx
import "../app/globals.css";
import HeaderNavigationBar from "@/components/header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeaderNavigationBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
