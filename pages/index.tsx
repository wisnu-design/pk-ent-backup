import { Inter } from "next/font/google";
import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import Billboard from "@/components/organisms/Billboard";
import MusicEvent from "@/lib/EventsData";
import EventList from "@/components/organisms/EventList";
import { api } from "@/lib/graphql/api";
import { BILLBOARD, HOME, QUERY } from "@/lib/graphql/query";
import BrandActivation from "@/components/organisms/BrandActivation";
import Highlight from "@/components/organisms/Highlight";
import Footer from "@/components/organisms/Footer";
import Loader from "./concert/loading";

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
  return (
    <>
      <Seo
        metaTitle="PK Entertainment"
        metaDesc="PK Entertainment"
        metaKey="Event Organizer Promotor"
      />
      <Header />

      <Billboard data={billboard.concerts} />

      <div className="lg:pb-20 pb-10 pt-10">
        <EventList title="Events" data={concerts} />
      </div>
      {/*
      
      <div className="lg:pb-20 md:pb-0 pb-0 ">
        <BrandActivation title="Brand Activation" data={brands} />
      </div>
      */}
      <div className="pb-40">
        <Highlight />
      </div>
      <Footer />
    </>
  );
}
