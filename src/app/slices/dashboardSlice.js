import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';



const _updateBottles = (state) => {

    const currentDateTime = moment().utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss');
    //se toman solo los eventos biberon
    const filteredEventsBottles = state.allEvents.filter(evento => evento.idCategoria === 35);
    if (filteredEventsBottles.length === 0) {
        state.elapsedTimeBottle = "00:00";
        state.totalBabyBottles = 0;
        state.remainingTimeBottle = "00:00";



    }
    else {
        //se realiza el conteo de los eventos biberon
        state.totalBabyBottles = filteredEventsBottles.filter((event) => moment(event.fecha).isSame(currentDateTime, 'day')).length;
        //Se obtiene la diferencia entre el ultimo biberon ingresado y el tiempo actual y se actualiza el estado de tiempo trancurrido biberon
        const lastBottle = filteredEventsBottles.reduce((latest, evento) => moment(evento.fecha).isAfter(moment(latest.fecha)) ? evento : latest);//se obtiene ultimo biberon ingresado segun la hora
        // Calcula la diferencia en milisegundos
        const durationInMilliseconds = moment().diff(moment(lastBottle.fecha));
        // Formatea la diferencia en HH:mm
        state.elapsedTimeBottle = moment.utc(durationInMilliseconds).format('HH:mm');

        ////calculo de tiempo para el proximo biberon

        // Calcula la hora en la que debería darse el próximo biberón (4 horas después del último)
        const nextFeedingTime = moment(lastBottle.fecha).add(4, 'hours');

        // Calcula el tiempo restante hasta la próxima ingesta
        const remainingTimeMilliseconds = nextFeedingTime.diff(moment());

        // Si el tiempo ya pasó, remainingTimeMilliseconds será negativo.
        // Formatea el tiempo restante en HH:mm
        state.remainingTimeBottle = moment.utc(Math.abs(remainingTimeMilliseconds)).format('HH:mm');

        // Cambia el color según el tiempo restante
        state.bottleTimeColor = remainingTimeMilliseconds > 0 ? 'green' : 'red';

    }
};



const _updateDiapers = (state) => {
   
    const currentDateTime = moment().utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss');
    //se toman solo los eventos pañal
    const filteredEventsDiaper = state.allEvents.filter(evento => evento.idCategoria === 33);
    //se realiza el conteo de los eventos pañal
    if (filteredEventsDiaper.length === 0) {
        state.elapsedTimeDiapers = "00:00";
        state.totalDiapers = 0;
    }
    else {

        state.totalDiapers = filteredEventsDiaper.filter((event) => moment(event.fecha).isSame(currentDateTime, 'day')).length;
        //Se obtiene la diferencia entre el ultimo pañal ingresado y el tiempo actual y se actualiza el estado de tiempo trancurrido pañal
        const lastDiaper = filteredEventsDiaper.reduce((latest, evento) => moment(evento.fecha).isAfter(moment(latest.fecha)) ? evento : latest);//se obtiene ultimo pañal ingresado segun la hora
        // Calcula la diferencia en milisegundos
        const durationInMilliseconds = moment().diff(moment(lastDiaper.fecha));
        // Formatea la diferencia en HH:mm
        state.elapsedTimeDiapers = moment.utc(durationInMilliseconds).format('HH:mm');
    }
};


const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState: {
        allEvents: [],
        filterEvents: [],
        totalBabyBottles: 0,
        totalDiapers: 0,
        elapsedTimeBottle: "00:00",
        elapsedTimeDiapers: "00:00", 
        categories: [],
        remainingTimeBottle:"00:00",
        bottleTimeColor:'red',
    },
    // Cada funcion reductora recibe el estado actual
    reducers: {
        // Se cargan en el primer renderizado del dashboard todos los eventos
        LoadingAllCategories: (state, action) => {
            state.categories = action.payload;
        },

        LoadingAllEvents: (state, action) => {
            const { payload } = action;         
            state.allEvents = payload;
            state.filterEvents = payload;           
            _updateDiapers(state);
            _updateBottles(state);
    
        },
        AddEvent: (state, action) => {
            const { payload } = action;
            state.allEvents = [...state.allEvents, payload];
            state.filterEvents = state.allEvents;
            if (payload.idCategoria === 33) _updateDiapers(state)
          
            //se evalua que solo se renderise si el evento es pañal
            if (payload.idCategoria === 35){
                 _updateBottles(state)
                //_nextBottle(state);
            }
                ;//se evalua que solo se renderise si el evento es biberon
            if (payload.idCategoria === 31) state.lastMeal = payload;//se evalua que solo se renderise si el evento es comida
        },
        DeleteEvent: (state, action) => {
            const { payload } = action;
            const newAllEvents = state.allEvents.filter((event) => event.id !== payload);
            state.allEvents = newAllEvents;
            state.filterEvents = newAllEvents;
            _updateDiapers(state);//se evalua que solo se renderise si el evento es pañal
            _updateBottles(state);//se evalua que solo se renderise si el evento es biberon
            //_nextBottle(state);

        },


        GetFilteredEvents: (state, action) => {
            const currentDateTime = moment().utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss');

            const { payload } = action;
            if (payload == 1) {
                state.filterEvents = state.allEvents;
            } else if (payload == 2) {//se toman los eventos del dia actual sin tener en cuenta la hora
                const newFilterEvent = state.allEvents.filter((event) => moment(event.fecha).isSame(currentDateTime, 'day'));
                state.filterEvents = newFilterEvent;
            } else {//se toman los eventos de dias anteriores sin tener en cuenta la hora
                const newFilterEvent = state.allEvents.filter((event) => moment(event.fecha).startOf('day').isBefore(moment(currentDateTime).startOf('day')));
                state.filterEvents = newFilterEvent;
            }
        },

    },
});

export const { LoadingAllEvents, GetFilteredEvents, DeleteEvent, LoadingAllCategories, AddEvent } = dashboardSlice.actions;
export default dashboardSlice.reducer;