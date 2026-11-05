import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProject from "@/components/FeaturedProject";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import MotionProvider from "@/components/MotionProvider";

/** Single-page portfolio. Section order: Hero → About → Skills → Projects → Achievements → Contact. */
export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-crimson focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <AnimatedBackground />
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
