import { NextPage } from "next";
import HomeWrapper from "./_components/home/HomeWrapper";
import HomeServices from "./_components/home/HomeServices";
import { Footer } from "./_components/shared/Footer";
import AnimationWrapper from "./_components/shared/AnimationWrapper";

const Homepage: NextPage = () => {
  return (
    <AnimationWrapper>
      <HomeWrapper />
      <HomeServices />
      <Footer />
    </AnimationWrapper>
  )
}

export default Homepage;
