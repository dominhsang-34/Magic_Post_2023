import axios from "axios";
import { packageInfor } from "./packInfor";
import { addPackageStatus } from "./addPackage";
import { getGuesspath } from "./updateFailPackage";

export const autoForwarding = (packageCode, isTrade, change, setChange, userId) => {
    let myPack;
    const promise = getGuesspath(packageCode);
    Promise.all([promise])
        .then(res => {
            myPack = res[0];
            updatePackage(myPack, isTrade, change, setChange, userId)
        })
        .catch(err => {
            console.log(err);
        })
}
export const updatePackage = (myPack, type, change, setChange, userId) => {
    console.log("myPack", myPack);
    console.log('pack', myPack)
    if (myPack) {
        let {
            code,
            From_Po_id,
            Guess_path,
            To_po_id,
            weight,
            current_po_id,
            id,
            receiverName,
            receiverPhone,
            senderName,
            senderPhone,
            statusName,
        } = myPack;
        let guessPatharray = Guess_path.split("-");
        let position = guessPatharray.indexOf(current_po_id.toString());
        let newPack = {
            id,
            code,
            From_Po_id,
            To_po_id,
            weight,
            statusName: type === false ? "Arriving" : "Pending",
            receiverName,
            receiverPhone,
            senderName,
            senderPhone,
            Guess_path,
            current_po_id: type === false ? parseInt(guessPatharray[position + 1]) : parseInt(guessPatharray[position]),
        }
        if (type === false) {  // type = false => Pending package is forwarded
            const packStatus = {
                packageCode: newPack.code,
                currentPoID: parseInt(guessPatharray[position]),
                employeeAssignTimeWentID: userId,
                timeArrived: null,
                description: null,
                employeeAssignTimeArrivedID: null,
                timeWent: new Date(),
            }
            updateStatusOnServer(packStatus);
        } else {
            const packStatus = {
                packageCode: newPack.code,
                currentPoID: parseInt(guessPatharray[position]),
                employeeAssignTimeWentID: null,
                timeArrived: new Date(),
                description: null,
                employeeAssignTimeArrivedID: parseInt(userId),
                timeWent: null,
            }
            console.log("packStatus", packStatus);
            addPackageStatus(packStatus);
        }
        console.log("updated package", newPack);
        updatePackageOnServer(newPack);
        setChange(!change);
    } else {
        console.log('myPack is undefined or null');
    }
}


const updatePackageOnServer = (newPack) => {
    axios.put('http://localhost:3001/updatePackage', newPack)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

const updateStatusOnServer = (newStatus) => {
    axios.put('http://localhost:3001/updateStatus', newStatus)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}
