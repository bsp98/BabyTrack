import { useSelector } from "react-redux";
import EventsTableRow from "./EventsTableRow/EventsTableRow";


const EventsTable = ({ onDelete }) => {
  const events = useSelector((store) => store.dashboardSlice.filterEvents);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Categoria</th>
          <th>Detalle</th>
          <th>Fecha</th>
          <th>img</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {events.map(({ id, idCategoria, detalle,fecha}) => (
          <EventsTableRow
            id={id}
            idCategoria={idCategoria}
            detalle={detalle}
            fecha={fecha}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
