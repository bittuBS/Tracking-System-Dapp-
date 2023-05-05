import React,{useState, useEffect} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
//internal import
import tracking from "./tracking.json";
//import Navbar from "../Components/Navbar";




//fetch the contract


function Child (props)
{
    const ContractAddress="0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ContractABI =tracking.abi;
    const fetchContract =(singnerOrProvider)=>
new ethers.Contract(ContractAddress,ContractABI,singnerOrProvider);

    //State variable
    const dappname ="hello";
    const [currentUser,setcurrentUser] = useState();

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
   const getAllShipment =async()=> {
        try{
            const provider =new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipments = await contract.getAllTransaction();
            const allshipments =shipments.map((shipment)=>({
                sender:shipment.sender,
                receiver:shipment.receiver,
                price:ethers.utils.formatEther(shipment.price.toString()),
                pickUpTime:shipment.pickUpTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                ispaid : shipment.ispaid,
                Status: shipment.status,
            }));
            return (allshipments);
        }
        catch(error){
            console.log("error in  getting shipments");
        }
    }
     const getShipmentCount =async()=>{
        try{
if(!window.ethereum)return "install metamask";
const account =await window.ethereum.request({method:"eth_accounts",});

const provider =new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const ShipmentCount =await contract.getShipmentCount(account[0]);
            return ShipmentCount.toNumber();



        }
        catch(error){
            console.log("error in the get shipment count",error);
        }

    };
     const completeShipment =async(item)=>{
        try{
            if(!window.ethereum)return "install metamask";
const account =await window.ethereum.request({method:"eth_accounts",});
const web3Modal= new Web3Modal();
        
const connection = await web3Modal.connect();
const provider =new ethers.providers.Web3Provider(connection);
const signer =provider.getSigner();
const contract =fetchContract(signer);
            const {receiver,index}=item;
            const completeshipment = await contract.completeShipment(account[0],receiver,index,{gasLimit: 300000,});
            completeshipment.wait();
            console.log(completeshipment);

        }
        catch(error){
            console.log("show error in the complete shipment",error);
        }

     }
     const getShipment =async(item)=>{
try{
        const {index}=item;
        if(!window.ethereum)return "install metamask";
const account =await window.ethereum.request({method:"eth_accounts",});

const provider =new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const getshipment =contract.getShipment(account[0],index*1);
            const singleshipment={
                sender:getshipment[0],
                receiver:getshipment[1],
                pickUpTime:getshipment[2].toNumber(),
                deliveryTime:getshipment[3].toNumber(),
                distance:getshipment[4].toNumber(),
                price:ethers.utils.formatEther(getshipment[5].toString()),
                Status:getshipment[6],
                ispaid:getshipment[7],
            };
            console.log(singleshipment);
}
catch(error){
    console.log("it show error in the getshipment function",error);
}
     }

const startShipment =async(item)=>{
    try{
        if(!window.ethereum)return "install metamask";
const account =await window.ethereum.request({method:"eth_accounts",});
 const {receiver,index}=item;
 const web3Modal =new Web3Modal();
 const connection = await web3Modal.connect();
 const provider = await ethers.providers.Web3Provider(connection);
 const signer = await provider.getSigner();
 const contract = fetchContract(signer);
 const startshipment = await contract.startshipment(account[0],receiver,index*1);
 await startshipment.wait();
 console.log(startshipment);

    }
    catch(error){
        console.log("error in the startshipment function",error);
    }

};
//CHECK WALLET CONNECTED
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

const Allshipment=props.getAllShipment(getAllShipment);
//const Cwallet=props.connectWallet(connectWallet);
//const Cshipment=props.createShipment(createShipment);
const Compshipment=props.completeShipment(completeShipment);
const Gshipment =props.getShipment(getShipment);
const GshipmentCount=props.getShipmentCount(getShipmentCount);
//props.ContractAddress(ContractAddress);
props.startShipment(startShipment);
//props.currentUser(currentUser);


return(
    < >
   {/* Allshipment={Allshipment}
   Cwallet={Cwallet}
    Cshipment={Cshipment}
    Compshipment={Compshipment}
    Gshipment={Gshipment}
    GshipmentCount={GshipmentCount} */}
    {/* connectWallet=  {connectWallet} */}
        {/* createShipment={createShipment} */}
        {/* getAllShipment ={getAllShipment} */}
    {/* completeShipment ={completeShipment} */}
        {/* getShipment ={getShipment} */}
        {/* getShipmentCount ={getShipmentCount} */}
        {/* startShipment ={startShipment}
        dappname ={dappname} */}
    {/* currentUser= {currentUser}
    ContractAddress={ContractAddress}; */}


   
    
   </>
    
)
};
export default Child;





