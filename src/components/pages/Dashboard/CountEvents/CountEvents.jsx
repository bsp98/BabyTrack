import NextBottle from "./NextBottle/NextBottle";
import TotalEvents from "./TotalEvents/TotalEvents";
import logo from "../Header/bebe.jpg";




function CountEvents() {



        return (

                <div className="d-flex justify-content-between m-5">

                        <div className="mt-3">
                        <NextBottle />
                        </div>
                        <img className="mr-2 rounded-circle" src={logo} style={{opacity: 0.4}} />

                        <div className="">
                        <TotalEvents />
                        </div>

                        
                </div>


        );


}
export default CountEvents;
