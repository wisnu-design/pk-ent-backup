import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import Seo from "@/components/Seo";
import React from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <>
      <Seo
        metaTitle="PK Entertainment | About Us"
        metaDesc="PK Entertainment"
        metaKey="Event Promotor"
      />
      <Header />
      <div className="h-screen text-white flex justify-center items-center">
        Coming Soon
      </div>
      <Footer />
    </>
  );
};

export default index;
