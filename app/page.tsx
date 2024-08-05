import { NextPage } from "next";
import HomeWrapper from "./_components/home/HomeWrapper";
import AnimationWrapper from "./_components/shared/AnimationWrapper";
import HomeServices from "./_components/home/HomeServices";

const Homepage: NextPage = () => {
  return (
    <AnimationWrapper>
      <HomeWrapper />
      <HomeServices />
    </AnimationWrapper>
  )
}

export default Homepage;
