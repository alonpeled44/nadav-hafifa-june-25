import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import DisplayNameContextProvider from "@/context/DisplayNameContext";
import WindowWidthContextProvider from "@/context/WindowWidthContext";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [displayName, setDisplayName] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);

  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
    } else if (user === "!") {
      setDisplayName("guest");
    } else {
      setDisplayName(user);
    }

    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  return (
    <WindowWidthContextProvider value={{ windowWidth, setWindowWidth }}>
      <DisplayNameContextProvider value={{ displayName, setDisplayName }}>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </DisplayNameContextProvider>
    </WindowWidthContextProvider>
  );
}
