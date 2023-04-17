import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileNav: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black z-[99999999] absolute top-8 right-0 py-5 flex-col border-2 border-gray-800 flex w-[200%]">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">
          Company
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Upcoming Events
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Brand Activation
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Concert
        </div>
        <div className="px-3 text-center text-white hover:underline">News</div>
      </div>
    </div>
  );
};

export default MobileNav;
