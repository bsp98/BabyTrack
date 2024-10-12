import { createSlice } from "@reduxjs/toolkit";
import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from "../../helpers/localstorage";

const user = getFromLocalStorage("user");

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userLogged: user,
    dataFromSelectDepartmen:[],
    dataFromSelectCity:[],
    department:"",
    city:""
  },
  // Cada funcion reductora recibe el estado actual
  reducers: {

    loginUser: (state, action) => {
      const { payload } = action;
      state.userLogged = payload;
      setToLocalStorage("user", payload);
    },
    logoutUser: (state) => {
      state.userLogged = null;
      removeFromLocalStorage("user");
      
    },
    setDataFromSelectDepart: (state,action)=>{
      const { payload } = action;
      state.dataFromSelectDepartmen = payload;
    },
    setDepartment(state,action){
      const { payload } = action;
      state.department = payload;
    },

    setDataFromSelectCity(state,action){
      const { payload } = action;
      state.dataFromSelectCity = payload;
    },

    setCity(state,action){
      const { payload } = action;
      state.city = payload;
    }


  },
});

export const { loginUser, logoutUser,setDataFromSelectDepart,setDataFromSelectCity,setDepartment,setCity } = userSlice.actions;
export default userSlice.reducer;
