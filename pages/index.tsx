import { Inter } from "next/font/google";
import Seo from "@/components/Seo";
import Header from "@/components/organisms/Header";
import Billboard from "@/components/organisms/Billboard";
import EventList from "@/components/organisms/EventList";
import { api } from "@/lib/graphql/api";
import { BILLBOARD, HOME, QUERY } from "@/lib/graphql/query";
import Footer from "@/components/organisms/Footer";
import InstagramCard from "@/components/molecules/InstagramCard";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const { concerts, brands }: any = await api.request(HOME);
  const { billboard }: any = await api.request(BILLBOARD);
  const url = `https://graph.instagram.com/me/media?fields=id,username,caption,media_url,timestamp,media_type,permalink,thumbnail_url&access_token=IGQVJWdFpBV0lVRjZApTDBPM1hmNFpXeDBOR0cwakFXb05sRENtOFc3cE1yS3ZAnSlhtZAnBjRGpUU2l2OENoVHpXN1hjLWVQT0cxYW1YSEhEUlI5V2J6ODNmUGtBRG9KOHZAVYnVuU3Y3bFJPamgxU0syMQZDZD`;
  const data = await fetch(url);
  const feed = await data.json();

  return {
    props: {
      concerts,
      brands,
      billboard,
      feed,
    },
  };
}

export default function Home({ concerts, brands, billboard, feed }: any) {
  
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
      {/*
      
      <div className="lg:pb-20 md:pb-0 pb-0 ">
        <BrandActivation title="Brand Activation" data={brands} />
      </div>
      */}
      {/*
      <div className="lg:pb-40 pb-20">
        <div className="px-4 md:px-12 mt-4">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-[1px] h-[25px] md:h-[30px] lg:h-[40px] bg-white/30 backdrop-blur-md"></div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                  Social
                </p>
              </div>
              <Link className="flex gap-2" href="#">
                <p className="text-white text-sm md:text-md lg:text-lg font-light mb-4"></p>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-5 lg:flex-row w-full h-full">
            {feed.data.slice(0, 15).map((v: any, index: number) => {
              return (
                <div key={index}>
                  <InstagramCard
                    caption={v.caption}
                    date={formatDate(v.timestamp)}
                    media_url={v.media_url}
                    media_type={v.media_type}
                    thumbnail_url={v.thumbnail_url}
                    permalink={v.permalink}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
       */}
      <Footer />
    </>
  );
}
