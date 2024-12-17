import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import Billboard from "@/components/organisms/Billboard";
import EventList from "@/components/organisms/EventList";
import { api } from "@/lib/graphql/api";
import { BILLBOARD, HOME } from "@/lib/graphql/query";
import Footer from "@/components/organisms/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const { concerts, brands }: any = await api.request(HOME);
  const { billboard }: any = await api.request(BILLBOARD);

  return {
    props: {
      concerts,
      brands,
      billboard,
    },
  };
}

export default function Home({ concerts, brands, billboard }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true); // Modal muncul saat halaman diload
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: any = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Seo
        metaTitle="PK Entertainment"
        metaDesc="PK Entertainment"
        metaKey="Event Organizer Promotor"
      />
      <Header />

      <Billboard data={billboard.concerts} />

      <div className="lg:pb-20 pb-10 lg:pt-10 pt-1">
        <EventList title="Events" data={concerts} />
      </div>

      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="p-6 rounded-lg  w-6/12 relative">
            <div className="mb-4">
              <video controls autoPlay muted loop className="w-full rounded-lg">
                <source src="/images/vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              onClick={closeModal}
              className="px-3 py-1 font-bold  text-white rounded hover:bg-slate-600/30 transition-all duration-200 absolute top-0 right-0"
            >
              X
            </button>
            <Link href={"/campaign"}>
              <button className="px-4 py-2 font-medium bg-white  text-black hover:text-white rounded hover:bg-slate-600/30 transition-all ">
                Join Now!
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
