import Head from "next/head";
import React from "react";

interface SEO {
  metaTitle: string;
  metaDesc: any;
  metaKey: string;
}

const Seo: React.FC<SEO> = ({ metaTitle, metaDesc, metaKey }) => {
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content={metaDesc} />
      <meta name="keyword" content={metaKey} />
    </Head>
  );
};

export default Seo;
