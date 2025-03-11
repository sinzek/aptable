import Starfield from "@/components/starfield";
import GetStartedButton from "@/components/ui/getStartedButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="h-1/2 absolute top-0 left-0 right-0 z-0" style={{
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

      <section className="w-full py-8 lg:pt-12 lg:pb-16 relative z-10">
        <div className="flex md:flex-row flex-col gap-8 lg:mx-[10%] md:mx-[10%] sm:mx-[5%] flex-1 items-center">
          <div className="flex flex-col gap-6 justify-center items-center w-full h-full text-center lg:px-32">
            <h1 className="font-extrabold lg:text-6xl text-3xl xl:px-36 md:text-3xl lg:leading-none font-sora text-white">Make learning addictive.</h1>
            <div className="flex flex-col w-fit mx-auto text-center gap-8">
              <h2 className="lg:text-4xl md:text-xl text-lg font-aleo font-bold text-white text-pretty">
                A game-ified online course platform<br />that's effective and fun.
              </h2>
              <h3 className="lg:text-xl md:text-base font-aleo font-semibold text-purple-200 text-pretty">
                Aptable is a revolutionary learning platform that makes mastering new skills as engaging as your favorite game. With interactive lessons, a tycoon-style progression system, and collectible rewards, Aptable turns studying into an addictive experience.
              </h3>
              <div className="flex flex-row gap-2 justify-center items-center w-auto">
                <GetStartedButton />
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-4 justify-center items-center w-full h-full relative">
            <Image src="/pingle_float_2x.webp" alt="A floating Pingle" width="619" height="453" className="relative z-10 lg:mb-10 w-1/2 md:w-auto floating" />
            <Image src="/ribbons_2x.webp" alt="Ribbons underneath Pingle" width="812" height="317" className="absolute -bottom-24 z-[2] w-1/2 md:w-auto" />
          </div>
        </div>
      </section>
    </div>

  );
}