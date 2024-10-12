import { useSelector, useDispatch } from "react-redux";
import  EventDeleteApi  from "../../../../Servicios/ServicioDashboard/EventDelete";
import {DeleteEvent} from "../../../../../../app/slices/dashboardSlice";
import "./EventsTableRow.css"

const EventsTableRow = ({id, idCategoria, detalle,fecha}) => {
  const userLogged = useSelector((store) => store.userSlice.userLogged);
  const categories = useSelector((store) => store.dashboardSlice.categories);
  const dispatcher = useDispatch();

  const getCategoryImage = (idCategoria) => {
    const category = categories.find((cat) => cat.id === idCategoria);
    return category ? `https://babytracker.develotion.com/imgs/${category.imagen}.png` : null;
  };
  
  const _onDelete = async () => {
    try {
      await EventDeleteApi(id, userLogged);
      dispatcher(DeleteEvent(id));
    } catch (error) {}
  };    
  return (
    <tr >
      <td>{id}</td>
      <td>{idCategoria}</td>
      <td>{detalle}</td>
      <td>{fecha }</td>
      <td>{<img src={getCategoryImage(idCategoria)} alt="" /> }</td>
      <td>
        <button className="boton-delete" onClick={_onDelete}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default EventsTableRow;