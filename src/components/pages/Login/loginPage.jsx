import { useRef, useState } from "react";
import "./loginPage.css";
import { loginAPI } from "../Servicios/ServicioLogin/ServicioLogin";
import Alert from "../../UI/Alert/Alert";
import logo from "../Dashboard/Header/bebe.jpg"
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import ValidateInputFrom from "../../../helpers/validation"

const LoginPage = () => {

  const inputUserNameRef = useRef()
  const inputPasswordRef = useRef()
  const [btnState, setBtnState] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const dispatcher = useDispatch();
  const navigateTo = useNavigate();



  const _onHandleChangeBtn = () => {
    if (!ValidateInputFrom(inputUserNameRef.current.value, inputPasswordRef.current.value)) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  };


  const _onLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAPI(inputUserNameRef.current.value, inputPasswordRef.current.value);

      let user = {
        apikey: data.apiKey,
        id: data.id
      }

      setAlertMessage("Haz iniciado sesión correctamente");
      setAlertClass("alert-success");

      setTimeout(() => {

        dispatcher(loginUser(user));
        navigateTo("/dashboard");

      }, 2000);
    } catch (error) {
      setAlertMessage("Username o password incorrectos");
      setAlertClass("alert-danger");
    }

  };



  return (
    <div className="login-container">
      <div className="text-center logo-container">
        <img src={logo} width="70" alt="Logo" />
      </div>
      <h1 className="text-center">Sign in</h1>
      <form>
        {alertMessage != "" ? (
          <Alert message={alertMessage} classColor={alertClass} />
        ) : (
          ""
        )}
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            <input
              ref={inputUserNameRef}
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter username"
              onChange={_onHandleChangeBtn}
            />
          </div>
          <div className="form-group" >
            <label htmlFor="password" className="">Password</label>
            <div className="input-group">

              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>

              <input
                className="form-control"
                ref={inputPasswordRef}
                placeholder="Enter password"
                type="password"
                id="password"
                onChange={_onHandleChangeBtn} />

            </div>
          </div>

        </div>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
        <button
          disabled={btnState}
          type="submit"
          className="boton-login"
          onClick={_onLogin}
        >
          Log in
        </button>
      </form>
    </div>
  )
};

export default LoginPage;
