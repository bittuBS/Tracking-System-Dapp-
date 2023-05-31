//SPDX-License-Identifier:UNLINCENSED

pragma solidity^0.8.0;
contract tracking {
    enum shipmentStatus{PENDING , IN_TRANSIT , DELIVERD}
    struct Shipment{
        address sender;
        address receiver;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        shipmentStatus status;
        bool isPaid;

    }
    mapping(address=>Shipment[])public shipments;
    uint public shipmentCount;
    struct TypeShipment{
        address sender;
        address receiver;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        shipmentStatus status;
        bool isPaid;

    }
    TypeShipment[] typeShipments;
    event ShipmentCreated(address indexed sender , address indexed receiver ,uint pickupTime , uint distance , uint price );
        event ShipmentInTransit(address indexed sender , address indexed receiver ,uint pickupTime );
    event ShipmentDelivered(address indexed sender , address indexed receiver ,uint deliveryTime );
    event ShipmentPaid(address indexed sender , address indexed receiver ,uint amount);

constructor(){
    shipmentCount =0;
}
function createShipment(address _receiver , uint _pickupTime, uint _distance, uint _price)public payable{
    require(msg.value == _price,"payment amount not equal");
    Shipment memory shipment =Shipment(msg.sender, _receiver,_pickupTime,0,_distance, _price, shipmentStatus.PENDING, false);
    shipments[msg.sender].push(shipment);
    shipmentCount ++;
    typeShipments.push(TypeShipment(msg.sender, _receiver,_pickupTime,0,_distance,_price, shipmentStatus.PENDING,false));
    emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
}
function startShipment(address _sender , address _receiver, uint _index)public { 
    Shipment storage shipment =shipments[_sender][_index];
    TypeShipment storage typeshipment = typeShipments[_index];
    require(shipment.receiver ==_receiver,"invalid receiver");
    require(shipment.status == shipmentStatus.PENDING,"shipment is not in the pending state it is intransmint");
shipment.status= shipmentStatus.IN_TRANSIT;
typeshipment.status= shipmentStatus.IN_TRANSIT;
emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);

}
function completeShipment(address _sender ,address _receiver ,uint _index) public {
    Shipment storage shipment =shipments[_sender][_index];
    TypeShipment storage typeShipment = typeShipments[_index];
    require(shipment.receiver == _receiver,"invalid receiver");
    require(shipment.status == shipmentStatus.IN_TRANSIT,"shipment not in transit");
    require(!shipment.isPaid,"shipment already paid");
    shipment.status =shipmentStatus.DELIVERD;
    typeShipment.status =shipmentStatus.DELIVERD;
typeShipment.deliveryTime= block.timestamp;
shipment.deliveryTime =block.timestamp;

uint amount =shipment.price;
payable(shipment.sender ).transfer(amount);
shipment.isPaid =true;
typeShipment.isPaid =true;
emit ShipmentDelivered(_sender,_receiver,shipment.deliveryTime);
emit ShipmentPaid(_sender,_receiver,amount);


}
function getShipment(address _sender, uint _index)public view returns(address,address,uint ,uint,uint,uint,shipmentStatus,bool){
    Shipment memory shipment =shipments[_sender][_index];
    return (shipment.sender,shipment.receiver,shipment.pickupTime,shipment.deliveryTime,shipment.distance,shipment.price,shipment.status,shipment.isPaid);

}
function getShipmentsCount(address _sender)public view returns(uint){
    return shipments[_sender].length;
}
function getAllTransaction()public view returns(TypeShipment[]memory)
{
    return typeShipments;
}
     
}
