import MainContainer from "../components/MainContainer";
import SideBarMoile from "../components/sideBarMoile";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100  items-center justify-center">
      <MainContainer />
      <SideBarMoile />
    </div>
  );
};

export default Home;
