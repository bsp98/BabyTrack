import { useSelector } from 'react-redux';

import imgBiberon from "./biberon.jpg"
import imgPanial from "./panial.jpg"
import imgReloj from "./reloj.jpg"

import "../CountEvents.css"
const TotalEvents = () => {


    const totalBabyBottles = useSelector((state) => state.dashboardSlice.totalBabyBottles);
    const totalDiapers = useSelector((state) => state.dashboardSlice.totalDiapers);
    const elapsedTimeBottle = useSelector((state) => state.dashboardSlice.elapsedTimeBottle);
    const elapsedTimeDiapers = useSelector((state) => state.dashboardSlice.elapsedTimeDiapers);


    return (
        <>
            <div className="mt-3 ">
                <div className='d-flex justify-content-between'>
                    <p className="mb-0 p ">Total biberones</p>
                    <p className="mb-0 p">Tiempo ultimo biberon</p>

                </div>
                <div className="borderContainer d-flex container-count-events">
                    <div className="m-2">

                        <img src={imgBiberon} width="67" />
                    </div>
                    <p className="p-totales">{totalBabyBottles}</p>
                    <img className='mt-3 ml-5' src={imgReloj} width="50" height={70} />
                    <p className='p-contador'>{elapsedTimeBottle}</p>


                </div>


            </div>

            <div className="mt-3">
                <div className='d-flex justify-content-between'>
                   <p className="mb-0 p ">Total Diapers</p>
                    <p className="mb-0 p">Tiempo ultimo pañal</p>
                </div>
                <div className="borderContainer d-flex container-count-events">
                    <div className="m-2">

                        <img className='mt-1' src={imgPanial} width="70" height={75} />
                    </div>
                    <p className="p-totales">{totalDiapers}</p>
                    <img className='mt-3 ml-5 img-margin' src={imgReloj} width="50" height={70} />
                    <p className='p-contador'>{elapsedTimeDiapers}</p>

                </div>
            </div>
        </>

    )
}
export default TotalEvents;
