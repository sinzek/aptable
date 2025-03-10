import Starfield from "@/components/starfield";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="h-1/2 absolute top-0 left-0 right-0" style={{
      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
      maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"
      }}>
        <Starfield 
          starCount={500}
          repulsionRadius={50} 
          repulsionStrength={0.08}
          returnSpeed={0.03}
        />
      </div>

      <p>
        OH HELLO THERE!
      </p>
    </div>
    
  );
}