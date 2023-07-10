import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="mx-auto max-w-mains bg-sky-100">{children}</div>;
};

export default Layout;
