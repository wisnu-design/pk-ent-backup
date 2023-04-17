import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);

  return (
    <div className={`loader-container${loading ? " loading" : ""}`}>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="bar"></div>
          <div className="logo">
            <Image src="" alt="Logo" />
          </div>
        </div>
      </div>
      <div className="door-wrapper">
        <div className="door"></div>
      </div>
    </div>
  );
};

export default Loader;
