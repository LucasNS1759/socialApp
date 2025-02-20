
// deberia de cambiar esto para que este unico componente se use en escritorio y mobile, a traves de un estado que me indique si es escritorio o mobile y un ternario renderizar una estructura u otra de jsx
const SideBar = () => {
  return (
    <aside className="w-64 max-h-full mt-16 bg-gray-100  p-4 fixed top-0 left-0 h-full lg:block hidden border-r shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Sidebar</h2>
      <ul className="text-center">
        <li>
          <a href="#" className="block py-2 px-4 hover:bg-gray-300">
            perfil
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 hover:bg-gray-300">
            mensajes
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 hover:bg-gray-300">
            guardado
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 hover:bg-gray-300">
            notificaciones
          </a>
        </li>

        <button className="w-full py-2 px-4 hover:bg-gray-300">Postear</button>
      </ul>
    </aside>
  );
};

export default SideBar;
