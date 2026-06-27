import Image from "next/image";
import Banner from "./components/Banner";
import FeaturedTasks from "./components/FeaturedTasks";
import TopFreelancers from "./components/TopFreelancers";
import HowItWorks from "./components/HowItWorks";
import { getUserSession } from "@/lib/core/session";
import Testimonials from "./components/Testimonials";
import CommunityHighlights from "./components/CommunityHighlights";

export default async function Home  () {
    const user = await getUserSession();
  return (
    <div >
      <Banner user={user} />
       <HowItWorks user={user} />
      <FeaturedTasks/>
      <TopFreelancers/>
      <Testimonials/>
      <CommunityHighlights/>
    </div>
  );
}
