import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { AddEvent, LoadingAllEvents } from "../../../../app/slices/dashboardSlice";
import RegistrarEventApi from "../../Servicios/ServicioDashboard/RegistrarEvent";
import Alert from "../../../../components/UI/Alert/Alert";
import moment from 'moment';
import "./FormAddEvent.css"



const FormAddEvent = () => {
    const categories = useSelector(state => state.dashboardSlice.categories);
    const valueCategorie = useRef();
    const valueDateTime = useRef();
    const valueDetalle = useRef();
    const user = useSelector(state => state.userSlice.userLogged);
    //const user = getFromLocalStorage("user");
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    const _registerEvent = async (e) => {
        e.preventDefault();

        const currentDateTime = moment().utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss');
        const categoryValue = valueCategorie.current.value;
        const dateTimeValue = valueDateTime.current.value ? valueDateTime.current.value: currentDateTime ;
        const dateValidate = moment(dateTimeValue).utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss');
        const detalleValue = valueDetalle.current.value;
       

       

        if (dateValidate <= currentDateTime) {
            try {
                const data = await RegistrarEventApi(categoryValue, user, detalleValue, dateTimeValue);

                const newEvent = {
                    id: data.idEvento,
                    idCategoria: Number(categoryValue),
                    idUsuario: user.id,
                    detalle: detalleValue,
                    fecha: moment(dateTimeValue).format('YYYY-MM-DD HH:mm:ss')
                };

                dispatch(AddEvent(newEvent));
                setAlertMessage("Evento registrado con éxito");
                setAlertClass("alert-success");
            } catch (error) {
                setAlertMessage(error.message);
                setAlertClass("alert-danger");
            }
        }
        else {
            setAlertMessage("La fecha no puede ser posterior al dia actual");
            setAlertClass("alert-danger");
        }

    }
    
    
    
    // const now = new Date()
    // now.setHours(23, 59, 59, 999);
    
    
    return (
        <>
            <h2 className="text-center pb-5">Nuevo evento</h2>
        <div className="container-md mb-4">
        <div className="row">
            <div className="col-md-6">
                <div className="form-group mb-3">
                    <label htmlFor="categoria">Categoría</label>
                    <div className="input-group">
                        <select className="form-control form-control-lg" id="categoria" ref={valueCategorie}>
                            {categories.map((c) => (
                                <option value={c.id} key={c.id}>{c.tipo}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="datetime" className="form-label">Fecha y Hora:</label>
                    <div className="input-group">
                        <span className="input-group-text color-i">
                            <i className="bi bi-calendar-event"></i>
                        </span>
                        <input type="datetime-local" className="form-control" id="datetime" ref={valueDateTime} />
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Detalles</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ref={valueDetalle}></textarea>
                </div>

                <div className="mb-5">
                    <button type="submit" className=" w-100 boton-agregar " onClick={_registerEvent}>Agregar evento</button>
                </div>
            </div>
        </div>
        {alertMessage && <Alert message={alertMessage} classColor={alertClass} />}
    </div>
                            </>
);
};

export default FormAddEvent;
