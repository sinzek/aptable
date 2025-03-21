import Starfield from "@/components/starfield";
import { GetStartedButton } from "@/components/ui/getStartedButton";
import { PinglePic } from "@/components/ui/pinglePic";
import Image from "next/image";
import { SearchButton, SearchModal } from "@/components/ui/courseSearch";
import { FadeOverlay } from "@/components/fadeOverlay";


export default function Home() {
  return (
    <div className="h-screen">
      <FadeOverlay />
      <SearchModal />
      {/* DESKTOP / TABLET */}
      <div className="invisible md:visible h-1/2 absolute top-0 left-0 right-0 z-0" style={{
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"
      }}>
        <Starfield
          starCount={800}
          repulsionRadius={50}
          repulsionStrength={0.08}
          returnSpeed={0.03}
        />
      </div>
      {/* MOBILE */}
      <div className="visible md:invisible h-1/2 absolute top-0 left-0 right-0 z-0" style={{
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"
      }}>
        <Starfield
          starCount={300}
          isMobile={true}
          repulsionRadius={50}
          repulsionStrength={0.08}
          returnSpeed={0.03}
        />
      </div>

      <section className="w-full py-8 lg:pt-12 lg:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mx-6 sm:mx-10 md:mx-[15%] items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
            <div>
              <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight font-sora text-yellow-400 max-w-xl">
                Make learning
              </h1>
              <h1 className="font-extrabold text-[3.2rem] md:text-5xl lg:text-[5.3rem] leading-tight font-sora bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 to-[90%] bg-clip-text text-transparent max-w-xl">
                addictive.
              </h1>
            </div>
            <div className="flex flex-col gap-6 max-w-lg">
              <h2 className="text-xl lg:text-2xl text-balance font-aleo font-extrabold text-white">
                A game-ified online course platform that&apos;s effective and fun.
              </h2>
              <h3 className="text-base md:text-lg lg:text-xl font-aleo font-semibold text-purple-100">
                Interactive lessons, a tycoon-style progression system, and collectible rewards— Aptable turns studying into an addictive experience.
              </h3>
            </div>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <GetStartedButton />
              <SearchButton />
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex justify-center items-center">
            <PinglePic />
            <Image
              src="/ribbons_2x.webp"
              alt="Ribbons underneath Pingle"
              width="812"
              height="317"
              className="absolute -bottom-12 z-[2] w-[70%] md:w-[80%]"
            />
          </div>
        </div>
      </section>

    </div>

  );
}