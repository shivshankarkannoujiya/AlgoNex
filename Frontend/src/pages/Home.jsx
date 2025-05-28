import { AnimatedDivider, HeroSection, KeyFeatures } from "../components";

const Home = () => {
  return (
    <div className="min-h-screen  flex flex-col bg-[#000814] home-gradient">
      <HeroSection />
      <AnimatedDivider />
      <KeyFeatures />
      <AnimatedDivider />
    </div>
  );
};

export default Home;
