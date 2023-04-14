import { Inter } from "next/font/google";
import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import Billboard from "@/components/organisms/Billboard";
import MusicEvent from "@/lib/EventsData";
import EventList from "@/components/organisms/EventList";
import { api } from "@/lib/graphql/api";
import { QUERY } from "@/lib/graphql/query";
import BrandActivation from "@/components/organisms/BrandActivation";
import Highlight from "@/components/organisms/Highlight";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const { concerts, brands }: any = await api.request(QUERY);

  return {
    props: {
      concerts,
      brands,
    },
    revalidate: 5,
  };
}

export default function Home({ concerts, brands }: any) {
  return (
    <>
      <Seo
        metaTitle="PK Entertainment"
        metaDesc="PK Entertainment"
        metaKey="Event Organizer Promotor"
      />
      <Header />

      <Billboard data={concerts} />

      <div className="lg:pb-20 pb-10 pt-10">
        <EventList title="Events" data={concerts} />
      </div>
      <div className="lg:pb-20 md:pb-0 pb-0 ">
        <BrandActivation title="Brand Activation" data={brands} />
      </div>
      <div className="pb-40">
        <Highlight />
      </div>
    </>
  );
}
