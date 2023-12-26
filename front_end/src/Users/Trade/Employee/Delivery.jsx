import React, { useState,useEffect } from "react";
import Navbar from "../../../shared/Layout/Navbar";
import Sidebar from "../../../shared/Layout/Sidebar/Sidebar";
import { Card } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import TBody from "../../../shared/Table/TBody";
import SearchPack from "../../../shared/Table/components/SearchPack"
import { fetchOutgoingPackages } from "../../../utils/mailUtils";
import { packageUserSend, takeSendingPostID } from "../../../utils/postInfor";
import { deliPackInfor } from "../../../utils/deliPackInfor";

const TABLE_HEAD = ["Package's Code", "Date", "Ship"];
const TABLE_ROWS = [{ pack: "1231321323", date: "12/12/2021" }];

const Delivery = () => {
  const postId = 1;
  const [page, setPage] = React.useState(0);
  const [change, setChange] = useState(true);
  const [deliPack, setDeliPack] = useState([]);

  //Lay thong tin cac goi tin den
  useEffect(() => {
    fetchOutgoingPackages(postId, setDeliPack);
  }, [change]);

  //Loc nhung goi tin la hang duoc gui tai TPost
  useEffect(() => {
    const fetchData = async () => {
      const filteredDeliPack = deliPack.filter(pack => packageUserSend(pack));
      const updatedDeliPack = await deliPackInfor(filteredDeliPack);
      console.log("uuu", updatedDeliPack);
      setDeliPack(updatedDeliPack);
    };
    
    fetchData();
  }, [change]);

  // setChange(!change);
  console.log(deliPack);
  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="h-screen w-[85%] sm:w-full px-auto">
        <Navbar />
        <main className="max-w-4xl flex-4 mx-auto py-2 my-4 rounded-lg">
          <Card className="w-full">
            <div className="flex-row">
              <Typography variant="h5" color="blue-gray">
                All Storing Package
              </Typography>
              <div className="flex flex-row">
                <Typography
                  color="gray"
                  className="hidden sm:inline-block mt-1 font-normal"
                >
                  See information about pending packages
                </Typography>
                <SearchPack/>
              </div>
            </div>
            <TBody
              TABLE_ROWS={TABLE_ROWS}
              type="TradeEmployee"
              TABLE_HEAD={TABLE_HEAD}
              page={page}
              setPage={setPage}
            />
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Delivery;
