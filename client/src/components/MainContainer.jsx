import FormPost from "./FormPost";
import SideBar from "./SideBar";
import SeccionSugerencias from "./SeccionSugerencias.";
import InfiniteScrollComponent from "./InfiniteScrollComponent";

const MainContainer = () => {
  return (
    <main className="min-h-screen flex w-full">
      {/* Sidebar izquierdo */}
      <SideBar />
      <div className="container mx-auto px-4 lg:ml-64 mt-20 flex flex-col text-center w-2/3">
        {/* FOEMULARIO DE POSTEO    ===== */}
        <FormPost />

        <InfiniteScrollComponent />
      </div>
      {/* Sección derecha */}
      <SeccionSugerencias />
    </main>
  );
};

export default MainContainer;
