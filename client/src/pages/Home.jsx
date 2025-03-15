import SideBarMoile from "../components/sideBarMoile";
import FormPost from "../components/FormPost";
import SideBar from "../components/SideBar";
import SeccionSugerencias from "../components/SeccionSugerencias.";
import { useState } from "react";
import Feed from "../components/views/Feed";
import Thread from "../components/views/Thread";

const Home = () => {
  const [currentView, setCurrentView] = useState({ type: "feed" });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100  items-center justify-center">
      <main className="min-h-screen flex w-full">
        {/* Sidebar izquierdo */}
        <SideBar />
        <section className="container mx-auto px-4 lg:ml-64 mt-20 flex flex-col text-center w-2/3">
          {/* FOEMULARIO DE POSTEO SOLO SE MUESTRA SI SE CARGA EL FEED */}
          {currentView.type === "feed" && <FormPost />}
          {currentView.type === "feed" && (
            <Feed setCurrentView={setCurrentView} />
          )}
            {currentView.type === "thread" && (
            <Thread setCurrentView={setCurrentView} id={currentView.id} currentView={currentView} />
          )}
        </section>
        {/* Sección derecha */}
        <SeccionSugerencias />
      </main>
      <SideBarMoile />
    </div>
  );
};

export default Home;
