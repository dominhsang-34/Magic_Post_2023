import React from 'react'
import Navbar from '../../../shared/Layout/Navbar'
import Sidebar from '../../../shared/Layout/Sidebar/Sidebar'
import { Card } from '@material-tailwind/react'
import TableInfor from '../../../shared/Table/components/TableInfor'
import { Tabss } from '../../../shared/Table/components/tab'
import SearchPack from '../../../shared/Table/components/SearchPack'
import TBody from '../../../shared/Table/TBody'

const TABS = [
  {label: "SUCCESS", value: "123" }, 
  {label: "FAILED", value: "456"},
];

const resHead = ["Package's ID", "Receive's Address", "Status", "Date"];
const fakeHead = ["Package's ID", "Receive's Address", "Failed Reason", "Date"];

const res = [
  {
    name: "1231ASASC",
    address: "Ha noi My DINh Thai",
    status: "Success",
    date: "27/01/2023",
  }
]

const fake = [
  {
    name: "448asdDAd",
    address: "Hoa binh adu",
    status: "Wrong package delivered",
    date: "27/01/2023",
  }
]

const TradeStatistic = () => {
  const [page, setPage] = React.useState(0);
  const [isTrade, setIsTrade] = React.useState(true);

  const TABLE_ROWS = isTrade ? res : fake;
  const TABLE_HEAD = isTrade ? resHead : fakeHead;

  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="h-screen w-[85%] sm:w-full px-auto">
        <Navbar />
        <main className="max-w-4xl flex-4 mx-auto py-2 my-4">
          <Card className="w-full">
          <TableInfor
              head="All packages"
              intro="all packages sent and received"
              add="hidden"
            />
            <div className="flex flex-col sm:flex-row">
              <Tabss TABS={TABS} setIsTrade={setIsTrade} setPage={setPage} />
              <SearchPack />
            </div>
            <TBody
              className="mt-4 border-2 border-gray-200 rounded-lg"
              TABLE_ROWS={TABLE_ROWS}
              type="tradeStat"
              TABLE_HEAD={TABLE_HEAD}
              page={page}
              setPage={setPage}
              isTrade={isTrade}
            />
          </Card>
        </main>
      </div>
    </div>
  )
}

export default TradeStatistic
