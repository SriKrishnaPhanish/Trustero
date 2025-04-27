import HomeBG from "../assets/HomeBG.jpg";
import { HomeLogo } from "../components/HomeLogo";
import { SideBar } from "../components/SideBar";
export const Landing = () => {
  localStorage.removeItem("JWT_TOKEN");
  return (
    <div
      className="bg-cover w-screen h-screen bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${HomeBG})` }}
    >
      <div className="h-1/2 grid grid-cols-1 md:grid-cols-3">
        <SideBar />
        <HomeLogo label={"TRUSTERO"} />
      </div>
      <div className="h-1/2 text-center">
        <p className="text-2xl">
          Share a simple link to gather authentic feedback and showcase it in a
          beautiful dashboard—no tech skills needed.
        </p>
        <div className="text-xl mt-12">
          <p>✔️ Your link. Their words. Real impact.</p>
          <p>✔️ From happy customers to social proof—fast.</p>
          <p>✔️ Gather, manage, and showcase with ease.</p>
        </div>
      </div>
    </div>
  );
};
