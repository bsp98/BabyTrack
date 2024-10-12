import { useSelector } from "react-redux";
import PieChart from "./PieChart/PieChart";
import BarChart from "./BarChart/BarChart";
import moment from 'moment';

const ChartContainer = () => {

    const categories = useSelector(state => state.dashboardSlice.categories);
    const events = useSelector(state => state.dashboardSlice.allEvents);

    const _quantitiesPerCategory = categories.reduce((result, category) => {
        // Filtramos los eventos que pertenecen a la categoría actual
        const cantEventsCategory = (events.filter(e => e.idCategoria === category.id)).length;

        // Si hay al menos un evento, añadimos un nuevo objeto al acumulador
        if (cantEventsCategory > 0) {
            result.categoriesArray.push(category.tipo);
            result.quantitiesArray.push(cantEventsCategory);
        }

        return result;
    }, { categoriesArray: [], quantitiesArray: [] });


    const _calculoSemanaPasada = () => {
        let fechaInicio = moment().subtract(1, 'weeks');
    
        let cantComidaDay = {
            fechas: [],
            cantComidas: []
        }
    
        for (let i = 0; i < 7; i++) {
            const fechaFormateada = fechaInicio.format('YYYY-MM-DD');
            cantComidaDay.fechas.push(fechaFormateada);
    
            const fechaInicioMoment = moment(fechaInicio).startOf('day');
    
            let cant = events.filter(e => {
                const eventDate = moment(e.fecha).startOf('day');
                return eventDate.isSame(fechaInicioMoment) && e.idCategoria === 31;
            }).length;
    
            cantComidaDay.cantComidas.push(cant);
    
            fechaInicio.add(1, 'days');
        }

        return cantComidaDay;
    }
    
    return (
        <div className="row my-3">
            {<div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h5>Gráfico barras</h5>
                        <div className="placeholder">
                            <BarChart
                                labels={(_calculoSemanaPasada()).fechas}
                                values={(_calculoSemanaPasada()).cantComidas}
                            />
                        </div>
                    </div>
                </div>
            </div>}

            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5>Gráfico torta</h5>
                        <div className="placeholder">
                            <PieChart
                                labels={_quantitiesPerCategory.categoriesArray}
                                data={_quantitiesPerCategory.quantitiesArray}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartContainer;