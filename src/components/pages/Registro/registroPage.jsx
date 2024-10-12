import SelectFormRegistro from "./SelectFormRegistro"
import { useEffect, useRef, useState } from "react";
import DepartmentApi from "../Servicios/ServicioRegistro/Department";
import CityApi from "../Servicios/ServicioRegistro/City";
import Alert from "../../UI/Alert/Alert";
import RergistrarUserApi from "../Servicios/ServicioRegistro/RegistrarUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setDataFromSelectDepart, setDataFromSelectCity, setDepartment, setCity } from "../../../app/slices/userSlice";
import ValidateInputFrom from "../../../helpers/validation"
import "./registroPage.css";




const RegistroPage = () => {

  //const [dataFromSelectDepart, setDataFromSelectDepart] = useState([]);
  // const [dataFromSelectCity, setDataFromSelectCity] = useState([]);
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const userName = useRef();
  const password = useRef();
  const department = useSelector((store) => store.userSlice.department);
  const city = useSelector((store) => store.userSlice.city);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  //const [departament, setDepartament] = useState("");
  //const [city, setCity] = useState("");


  //useSelector((store) => ())


  useEffect(() => {
    const _peticionDepartament = async () => {
      try {
        const data = await DepartmentApi();
        dispatcher(setDataFromSelectDepart(data.departamentos));
      } catch (error) {
        setAlertMessage(error.message);
        setAlertClass("alert-danger");
      }
    };

    _peticionDepartament();

  }, []);

  const _peticionCiudades = async (event) => {
    try {

      const data = await CityApi(event.target.value);
      dispatcher(setDepartment(event.target.value))
      dispatcher(setDataFromSelectCity(data.ciudades));
    } catch (error) {
      setAlertMessage(error.message);
      setAlertClass("alert-danger");
    }
  }

  const _setValueCity = (event) => {
    dispatcher(setCity(event.target.value));
  }

  const _registroUser = async (e) => {
    e.preventDefault();

    if (!ValidateInputFrom(userName.current.value, password.current.value)) {
      try {

        //preguntar porque Cannot access 'userName' before initialization
        // let userName = userName.current.value
        // let password = password.current.value

        const data = await RergistrarUserApi(userName.current.value, password.current.value, department, city);

        //falta guardar en el local storage
        let user = {
          apikey: data.apiKey,
          id: data.id
        }
        setAlertMessage("Su registro fue realizado correctamente");
        setAlertClass("alert-success");

        setTimeout(() => {
          dispatcher(loginUser(user));
          navigate("/dashboard");
        }, 2000);
      } catch (error) {

        setAlertMessage(error.message);
        setAlertClass("alert-danger");
      }
    } else {
      setAlertMessage("Por favor complete todos los campos");
      setAlertClass("alert-danger");
    }

  }


  return (
    <div className="d-flex justify-content-center align-items-center">
     
      <div className="  min-vh-1000 w-75 " >

        <div className="col-6 mx-auto " >
          <div className="card p-4 shadow-sm registro-container">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form>
              {alertMessage != "" ? (<Alert message={alertMessage} classColor={alertClass} />) : ("")}
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">User name</label>
                <div className="input-group">

                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>

                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter user" ref={userName} />
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1">Password</label>
                <div className="input-group">

                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>

                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password" ref={password} />
              </div>
                </div>

              <SelectFormRegistro title={"Department"} data={useSelector((store) => store.userSlice.dataFromSelectDepartmen)} callback={_peticionCiudades} type={"departmen"}></SelectFormRegistro>

              <SelectFormRegistro title={"City"} data={useSelector((store) => store.userSlice.dataFromSelectCity)} callback={_setValueCity}></SelectFormRegistro>

              <button type="submit" className="boton-registro " onClick={_registroUser}>Check in</button>
            </form>
          </div>
        </div>

      </div>
    </div>

  );
}




export default RegistroPage;