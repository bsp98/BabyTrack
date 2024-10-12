import { useSelector } from 'react-redux';
import imgBiberon from "../TotalEvents/biberon.jpg"

import imgReloj from "../TotalEvents/reloj.jpg"

import "../CountEvents.css"

const NextBottle = () => {

    const remainingTimeBottle = useSelector((state) => state.dashboardSlice.remainingTimeBottle);
    const bottleTimeColor = useSelector((state) => state.dashboardSlice.bottleTimeColor);








    return(
        
        // <>
        // <div >
        //     <p className="mb-0 p">Proximo bisadasadsdaberon</p>
        //     <div className="borderContainer d-flex container-count-events">
        //         <div className="m-2">
        //        <img src={imgComida} width="123" />
        //        <p className='p-contador'>{elapsedNextTimeBottle}</p>

        //         </div>

        // </div>
            
      

        // </div>

        // </>
        
        <div className="mt-3 ">
        <div>
            <p className="mb-0 p" style={{color:bottleTimeColor}}>Proximo biberon</p>

        </div>
        <div className="borderContainer d-flex container-count-events" style={{color:bottleTimeColor}}>
            <div className="m-2">
            <img className='mr-4' src={imgBiberon} width="67" />    
            </div>

            <img className='mt-3' src={imgReloj} width="50" height={70} />
            
            <p className='p-contador'>{remainingTimeBottle}</p>


        </div>
        </div>

        
    )
}
export default NextBottle;
