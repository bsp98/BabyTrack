import EventsFilter from "./EventsFilter/EventsFilter"
import EventsTable from "./EventsTable/EventsTable";
import "./EventsContainer.css";

const EventsContainer = () => {
  return (
    <div className="row my-3 ">
      <div className="col-12 ">
        <div className="">
          <EventsFilter />
          <div className="card-body">
            <h3>Lista de eventos</h3>
            <EventsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsContainer;
