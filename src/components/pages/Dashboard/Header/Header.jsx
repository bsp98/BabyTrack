
import "./Header.css";
import { logoutUser } from "../../../../app/slices/userSlice";
import logo from "./bebe.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const _onLogout = () => {
    dispatcher(logoutUser());
    navigate("/login")

  };

  return (
    <header className="row px-5 bg-orange header header-border">
      <div className="col-12 d-flex justify-content-between align-items-center my-3">

        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="mr-2 rounded-circle" width={70} />
        </div>

        <nav className="d-flex justify-content-center flex-grow-1">
          <a className="nav-item nav-link nav-item-custom" href="#anclaEstadisticas">Estadísticas</a>
          <a className="nav-item nav-link nav-item-custom" href="#anclaEventos">Eventos</a>
          <a className="nav-item nav-link nav-item-custom" href="#anclaNuevoEvento">Nuevo Evento</a>
        </nav>

        <div>
          <button type="submit" className="btn color-logout nav-item nav-link nav-logout-custom" onClick={_onLogout}> Log out </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
