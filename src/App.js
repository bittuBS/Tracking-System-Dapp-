 import React, {   useEffect, useState }  from "react";
import Navbar from"./Components/Navbar";
import Services from"./Components/services"
import Table from"./Components/table";
import Form from"./Components/Form";
import  Profile  from"./Components/profile";
import Completeshipment from"./Components/completeShipment";
import Getshipment from"./Components/getShipment";
import Startshipment from"./Components/startshipment";
import Footer from"./Components/footer";
import Child from "./Context/Child";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import tracking from "./Context/tracking.json";

function App() {
  
  // State variable
  const [createShipmentModel,setCreateShipmentModel]=useState(false);
  const[openProfile,setOpenProfile]=useState(false);
  const [startModal,setStartModal]=useState(false);
  const [completeModal,setCompleteModal]=useState(false);
  const[getModal,setGetModal]=useState(false);

  const [currentUser,setcurrentUser] = useState();
  const checkIfWalletConnect = async()=>{
    try{
    if(!window.ethereum)return "install metamask";
const account =await window.ethereum.request({method:"eth_accounts",});
 if(account.length){
    setcurrentUser(account[0]);

 }
 else 
 return"no account";

    }
    catch(error){
        return"not connected";
    }
};
// CONNECTED WALLET FUNCTION
const connectWallet =async()=>{
    try{ 
        if(!window.ethereum)return "install metamask";
        const account =await window.ethereum.request({method:"eth_requestAccounts",});
        setcurrentUser(account[0]);
    }
    catch(error){
console.log("not connection now")
    }
};
useEffect(()=>{
    checkIfWalletConnect()

},[]);


  function getAllShipment(data){
    
return(data);
  }
  function completeShipment(data){
    return(data);
  }
  function getShipment(data){
    return(data);
  }
  function getShipmentCount(data){
    return(data);
  }
  // function connectWallet(data){
  //   return(data);
  // }
  // function createShipment(data){
  //   return(data);
  // }
  
  const ContractAddress="0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ContractABI =tracking.abi;
  const fetchContract =(singnerOrProvider)=>
new ethers.Contract(ContractAddress,ContractABI,singnerOrProvider);


  const createShipment =async(item)=>{
    console.log(item);
    const{receiver,pickUpTime,distance,price}= item;
    try{
        const web3Modal =new Web3Modal();
        const connection = await web3Modal.connect();
        const provider =new ethers.providers.Web3Provider(connection);
        const signer =provider.getSigner();
        const contract =fetchContract(signer);
        const createItem =await contract.createShipment(
            receiver,new Date(pickUpTime).getTime(),distance,ethers.utils.parseUnits(price ,18),{value:ethers.utils.parseUnits(price,18),
            }
        );
        await createItem.wait();
        console.log(createItem);

    }
    catch(error){
        console.log("some want wrong",error);
    }
};
  // function currentUser(data){
  //   return(data);
  // }
  function startShipment(data){return data}
  // function ContractAddress(data){
  //   console.log(data);
  // }

  //data state variable
  const[allShipmentdata,setallShipmentdata]=useState([]);
  useEffect(()=>{
   const getCampaignsData = getAllShipment();
   console.log("hello first");
   return async ()=>{
    //const getCampaignsData = getAllShipment();
    const allData =await getCampaignsData;
    setallShipmentdata(allData);
    console.log("hello second");
  }
  },[]);
   

  return ( 
    <>
    <Child getAllShipment={getAllShipment}
    completeShipment={completeShipment}
    getShipment={getShipment}
    getShipmentCount={getShipmentCount}
    //connectWallet={connectWallet}
    //createShipment={createShipment}
    //currentUser={currentUser}
    startShipment={startShipment}
    //ContractAddress={ContractAddress}
    ></Child>
    
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