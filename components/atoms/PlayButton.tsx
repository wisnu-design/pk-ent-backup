import React from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { SingleEvent } from "../organisms/Stage";

const PlayButton = ({ link, target }: any) => {
  const router = useRouter();

  return (
    <Link target={target} href={link}>
      <button
        className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        gap-2
        backdrop-blur-sm
        "
      >
        <BsFillTicketPerforatedFill className="mt-[1px]" />
        Buy Ticket
      </button>
    </Link>
  );
};

export default PlayButton;
