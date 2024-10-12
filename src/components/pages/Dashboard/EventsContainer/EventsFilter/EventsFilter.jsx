import { useRef } from "react";
import { useDispatch } from "react-redux";
import { GetFilteredEvents } from "../../../../../app/slices/dashboardSlice";

const EventsFilter = () => {
  const selectRef = useRef();
  const dispatcher = useDispatch();
  const _onHandleChange = () => {
    dispatcher(GetFilteredEvents(selectRef.current.value));
  };

  return (
    <select className="form-control" onChange={_onHandleChange} ref={selectRef}>
      <option value="1">Todos</option>
      <option value="2">Hoy</option>
      <option value="0">Anteriores</option>
    </select>
  );
};

export default EventsFilter;