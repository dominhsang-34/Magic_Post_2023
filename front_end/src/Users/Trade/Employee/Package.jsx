import React, { useRef } from "react";
import Navbar from "../../../shared/Layout/Navbar";
import Sidebar from "../../../shared/Layout/Sidebar/Sidebar";
import { Card } from "@material-tailwind/react";
import Input from "../../../shared/Modal/components/Input";
import { Button } from "flowbite-react";
import Phone from "./components/Phone";
import Name from "./components/Name";
import { FiPrinter } from "react-icons/fi";

import SuccessForm from "../../../shared/Modal/Form/SuccesForm";
import { useReactToPrint } from "react-to-print";
import { Print } from "./Print";
import { generateCode } from "../../../utils/generatedCode";
import { addPackage } from "../../../utils/addPackage";

const Package = (data) => {
  const postId = data.postId;
  const userId = data.userId;
  const {getWorkerID} = require('../../../Authorization/Info');
  const {getPostOffice} = require('../../../Authorization/Info');
  console.log('test',userId, postId);
  const [sendName, setsendName] = React.useState("");
  const [sendAddress, setsendAddress] = React.useState("");
  const [sendPhone, setsendPhone] = React.useState(0);
  const [receiveName, setreceiveName] = React.useState("");
  const [receiveAddress, setreceiveAddress] = React.useState("");
  const [receivePhone, setreceivePhone] = React.useState(0);
  const [weight, setWeight] = React.useState(0);

  const [showModal, setShowModal] = React.useState(false);

  const [inform, setInform] = React.useState("");
  const [tick, setTick] = React.useState(false);

  //Print
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //Clear information
  const clear = () => {
    setsendName("");
    setsendAddress("");
    setsendPhone(0);
    setreceiveName("");
    setreceiveAddress("");
    setreceivePhone(0);
    setWeight(0);
  };

  const handleAddPackage = () => {
    const packData = {
      code: generateCode(getPostOffice()),
      weight: weight,
      sender: sendName,
      senderPhone: sendPhone,
      senderAddress: sendAddress,
      receiver: receiveName,
      receiverPhone: receivePhone,
      receiverAddress: receiveAddress,
    };
    addPackage(packData, userId);
  };

  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="h-screen w-[85%] sm:w-full px-auto">
        <Navbar />
        <main className="max-w-3xl flex-4 mx-auto py-2 my-4">
          <Card className="w-full">
            <div>Add New Package</div>
            <form action="">
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-4">
                <Name
                  name={sendName}
                  setName={setsendName}
                  label="Sender's Name"
                />
                <Name
                  name={receiveName}
                  setName={setreceiveName}
                  label="Receiver's Name"
                />

                <Phone
                  phone={sendPhone}
                  setPhone={setsendPhone}
                  label="Sender's Phone"
                />
                <Input
                  label="Sender's Address"
                  size="sm:col-span-3"
                  type="text"
                  value={sendAddress}
                  onChange={setsendAddress}
                />
                <Phone
                  phone={receivePhone}
                  setPhone={setreceivePhone}
                  label="Receiver's Phone"
                />
                <Input
                  label="Receiver's Address"
                  size="sm:col-span-3"
                  type="text"
                  value={receiveAddress}
                  onChange={setreceiveAddress}
                />
                <Input
                  label="Package's Weight (kg)"
                  size="sm:col-span-2"
                  type="number"
                  value={weight}
                  onChange={setWeight}
                />
                {/* Action */}
                <div className="mt-6 sm:col-span-4 flex justify-self-end">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={clear}
                  >
                    Clear
                  </button>
                  <button
                    className="mx-6 w-10 h-8 bg-blue-400 rounded-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrint();
                    }}
                  >
                    <FiPrinter className="h-5 w-5 mx-auto"></FiPrinter>
                  </button>
                  <div className="hidden">
                    <Print
                      ref={componentRef}
                      sendName={sendName}
                      sendAddress={sendAddress}
                      sendPhone={sendPhone}
                      receiveName={receiveName}
                      receiveAddress={receiveAddress}
                      receivePhone={receivePhone}
                      weight={weight}
                    />
                  </div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                      if (
                        sendName !== "" &&
                        sendAddress !== "" &&
                        sendPhone !== 0 &&
                        receiveName !== "" &&
                        receiveAddress !== "" &&
                        receivePhone !== 0 &&
                        weight !== 0
                      ) {
                        setInform("Package stored successful");
                        setTick(true);
                        handleAddPackage();
                        clear();
                      } else {
                        setInform("Please fill all the information");
                        setTick(false);
                      }
                    }}
                    className={`flex items-center gap-4 bg-green-500 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  >
                    Add
                  </Button>
                  {showModal && (
                    <div onClick={() => setShowModal(false)}>
                      <SuccessForm inform={inform} tick={tick} />
                      <div
                        className="opacity-25 fixed inset-0 z-40 bg-black"
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Package;
