import Cta from "@/components/cta";
import FAQ from "@/components/faq";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {

  return (
   <main className="min-h-screen w-full">
      <Navbar/>
      <Hero/>
      <Cta />
      <FAQ />
   </main>
  );
}
