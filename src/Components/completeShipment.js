import {useState} from "react";
import Str1 from "./SVG/Str1";


function ComponentShipment({completeModal , setCompleteModal , completeShipment}){


    const [completeShip, setCompleteShip]=useState({
        recevier: "",
        index : ""
    });
    const changeStatus =async ()=>{
        completeShipment(completeShip);
    }
    return completeModal ? (<div className="fixed inset-0 z-10 overflow-y-auto ">
    <div className="fixed inset-0 w-full h-full bg-black opacity-40"
    onClick={()=>setCompleteModal(false)}> </div>
    <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="flex justify-end">
                <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                onClick={()=>setCompleteModal(false)}>
<Str1/>
                </button>
            </div>
            <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                    <h4 className="text-lg font-medium  text-gray-800">
                        complete shipment
                    </h4>
                    <form 
                    onSubmit={(e)=>e.preventDefault()}>
                        <div className="relative mt-3 ">
                        <input type="text"
                            placeholder="receiver"
                            className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
                            outline-none border focus:border-indigo-600 shadow-sm rounded-lg "
                            onChange={(e)=>setCompleteShip({
                                ...completeShip,
                                recevier: e.target.value,
                            })}
                            />
                        </div>
                        <div className="relative mt-3">
                            <input type="number"
                            placeholder="Id"
                            className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
                            outline-none border focus:border-indigo-600 shadow-sm rounded-lg "
                            onClick={(e)=>
                                setCompleteShip({
                                    ...completeShip,
                                   index: e.target.value,
                                })
                            }></input>
                        </div>
                        <button onClick={()=>changeStatus()} className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center
                            text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                            rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2
                        ">change Status</button>
                    </form>
            </div>
            </div>
            </div>
            </div>
            ):("");
    
};
 export default ComponentShipment ;