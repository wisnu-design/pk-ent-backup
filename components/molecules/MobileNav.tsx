import Link from "next/link";
import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileNav: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black/50 backdrop-blur-lg z-[99999999] absolute top-8 right-0 py-5 flex-col rounded-lg flex w-[200%]">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          <Link href="/">Home</Link>
        </div>
        <div className="px-3 text-center text-white hover:underline">
          About Us
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <Link href="/concert/">Concerts</Link>
        </div>
        <div className="px-3 text-center text-white hover:underline">News</div>
        <div className="px-3 text-center text-white hover:underline">
          Contact Us
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
