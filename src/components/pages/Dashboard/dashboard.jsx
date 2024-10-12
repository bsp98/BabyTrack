import Header from "./Header"
import CountEvents from "./CountEvents/CountEvents";
import { useEffect, useState } from "react";
import Alert from "../../UI/Alert/Alert";
import EventsApi from "../Servicios/ServicioDashboard/Events";
import CategoriesApi from "../Servicios/ServicioDashboard/Categories";
import { useDispatch, useSelector } from "react-redux";
import { LoadingAllEvents, LoadingAllCategories } from "../../../app/slices/dashboardSlice"
import "./dashboard.css"
import EventsContainer from "./EventsContainer/EventsContainer";
import FormAddEvent from "./FormAddEvent/FormAddEvent";
import ChartContainer from "./ChartContainer/ChartContainer"


const DashboardPage = () => {
  //const user = useSelector(state => state.userSlice.userLogged);
  const dispatcher = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  //const eventos = useSelector((store) => store.dashboardSlice.allEvents);
  const user = useSelector(state => state.userSlice.userLogged);



  useEffect(() => {

    
    const _peticionEventos = async () => {
      try {      
       const data = await EventsApi(user);
        

        dispatcher(LoadingAllEvents(data.eventos))

      } catch (error) {
        console.error('Error al obtener eventos:', error);
        setAlertMessage(error.message);
        setAlertClass("alert-danger");
      }
    }
    _peticionEventos();



  }, [user,dispatcher]);


  useEffect(() => {
    const peticionCategories = async () => {
      try {
        const categoriesData = await CategoriesApi(user);
        dispatcher(LoadingAllCategories(categoriesData.categorias));
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    peticionCategories();
  }, [user]);

  return (


    
    <div className="fondo-container ">
      

      <div className="border-page div">
        <Header />
        <CountEvents />
      </div>
      <div className="border-page mt-3 div" id="anclaEventos">
        <EventsContainer />
      </div>
      <div className="border-page mt-3 pt-5 div" id="anclaNuevoEvento">
        <FormAddEvent />
      </div>
      <div className="border-page-footer mt-3 pt-5 div" id="anclaEstadisticas">
        <ChartContainer /> 
      </div>


      <div>
      <footer className="d-flex justify-content-between  div footer">
        <p  className="m-4">Bruno Souto</p>
        
      </footer>
      </div>
    </div>




  );
};

export default DashboardPage;