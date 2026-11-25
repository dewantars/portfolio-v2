"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

interface BackdropSpec {
  src: string;
  objectPosition: string;
  opacityClass: string;
}

const BACKDROP_MAP: Array<{ prefix: string; spec: BackdropSpec }> = [
  {
    prefix: "/cv",
    spec: {
      src: "/assets/space/moon-apollo17.jpg",
      objectPosition: "object-[78%_28%]",
      opacityClass: "opacity-[0.52]",
    },
  },
  {
    prefix: "/repositories",
    spec: {
      src: "/assets/space/saturn-cassini.jpg",
      objectPosition: "object-[65%_28%]",
      opacityClass: "opacity-[0.58]",
    },
  },
  {
    prefix: "/certifications",
    spec: {
      src: "/assets/space/earthrise-apollo17.jpg",
      objectPosition: "object-[70%_35%]",
      opacityClass: "opacity-[0.52]",
    },
  },
  {
    prefix: "/gallery",
    spec: {
      src: "/assets/space/mars-global.jpg",
      objectPosition: "object-[78%_25%]",
      opacityClass: "opacity-[0.48]",
    },
  },
];

const DEFAULT_BACKDROP: BackdropSpec = {
  src: "/assets/space/moon-apollo17.jpg",
  objectPosition: "object-center",
  opacityClass: "opacity-[0.50]",
};

export function SpaceBackdrop() {
  const pathname = usePathname() ?? "/";

  if (pathname === "/") {
    return null;
  }

  const matched =
    BACKDROP_MAP.find(
      (entry) =>
        pathname === entry.prefix || pathname.startsWith(`${entry.prefix}/`)
    )?.spec ?? DEFAULT_BACKDROP;

  return (
    <div
      aria-hidden="true"
      className="no-print fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden bg-[#000000]"
    >
      <Image
        src={matched.src}
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className={`object-cover ${matched.objectPosition} ${matched.opacityClass} grayscale contrast-[1.15]`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.72)_85%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.32)_55%,rgba(0,0,0,0.14)_100%)]" />
    </div>
  );
}
