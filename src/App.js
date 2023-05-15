 import React, {   useContext, useEffect, useState }  from "react";
import Navbar from"./Components/Navbar";
import Services from"./Components/services"
import Table from"./Components/table";
import Form from"./Components/Form";
import  Profile  from"./Components/profile";
import Completeshipment from"./Components/completeShipment";
import Getshipment from"./Components/getShipment";
import Startshipment from"./Components/startshipment";
import Footer from"./Components/footer";

import { TrackingContext } from "./Context/Child";

function App() {
  const {currentUser,
  createShipment,
  getAllShipment,
  completeShipment,
  getShipment,
  startShipment,
  getShipmentCount,
connectWallet}=useContext(TrackingContext);
  // State variable
  const [createShipmentModel,setCreateShipmentModel]=useState(false);
  const[openProfile,setOpenProfile]=useState(false);
  const [startModal,setStartModal]=useState(false);
  const [completeModal,setCompleteModal]=useState(false);
  const[getModal,setGetModal]=useState(false);
  // data state var
  const [allShipmentdata, setallShipmentdata]=useState();

 useEffect(()=>{
  const getCampaignsData = getAllShipment();
  console.log("hello first");
  return async ()=>{
   //const getCampaignsData = getAllShipment();
   const allData =await getCampaignsData;
   setallShipmentdata(allData);
   console.log("hello data state variable  second");
 }
 },[]);
  
  return ( 
    <>
    
      <Navbar  connectWallet={connectWallet} currentUser={currentUser}></Navbar> 
      <Services setOpenProfile={setOpenProfile} 
    setCompleteModal={setCompleteModal}
    setGetModal={setGetModal}
    setStartModal={setStartModal}/>
    
    <Table 
    setCreateShipmentModel={setCreateShipmentModel}
    allShipmentdata={allShipmentdata}
    />
    <Form 
    createShipmentModel={createShipmentModel}
    createShipment={createShipment}
    setCreateShipmentModel={setCreateShipmentModel}
    />
    <Profile 
    openProfile={openProfile}
    setOpenProfile={setOpenProfile}
    currentUser={currentUser}
    getShipmentCount={getShipmentCount}
    />
    <Completeshipment
    completeModal={completeModal}
    setCompleteModal={setCompleteModal}
    completeShipment={completeShipment}
    />
    <Getshipment
    getModal={getModal}
    setGetModal={setGetModal}
    getShipment={getShipment}
    />
    <Startshipment
    startModal={startModal}
    setStartModal={setStartModal}
    startShipment={startShipment}
    />
 
<Footer></Footer>


    </>
   
  );
}

export default App;