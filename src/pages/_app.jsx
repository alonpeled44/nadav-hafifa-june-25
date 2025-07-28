import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import DisplayNameContextProvider from "@/context/DisplayNameContext";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [displayName, setDisplayName] = useState("");
  const [windowWidth, setWindowWidth] = useState();
  const [selectedTheme, setSelectedTheme] = useState("light");


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

    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${selectedTheme}`);

    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname, selectedTheme]);

  return (
    <DisplayNameContextProvider value={{ displayName, setDisplayName }}>
      <Header selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
      <main>
        <Component {...pageProps} />
      </main>
    </DisplayNameContextProvider>
  );
}
