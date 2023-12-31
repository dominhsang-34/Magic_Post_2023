import { Tabss } from './components/tab';
import TableInfor from './components/TableInfor';
import SearchPack from './components/SearchPack';


import {
  CardHeader,
} from "@material-tailwind/react";

const TableHead = ({TABS, setIsTrade, setPage, type, TABLE_ROWS, setTABLE_ROWS, changeRow, setChangeRow, change, setChange }) => {
  let intro = "all sent packages",
    head = "Packages list",
    add = "";
  switch (type) {
    case "ceo":
      head = "Offices List";
      intro = "all offices";
      add = "flex shrink-0 flex-col gap-2 sm:flex-row";
      break;
    case "employee":
      add = "hidden";
      break;
    default:
      break;
  }

  return (
    <div>
      <CardHeader floated={false} shadow={false}>
        <div className="flex items-center mx-2 justify-between gap-8">
          <TableInfor   head={head} intro={intro} add={add}  change={change} setChange={setChange}/>
        </div>
        <div className="flex flex-col mx-4 items-center justify-between gap-4 md:flex-row">
          <Tabss TABS={TABS} setIsTrade={setIsTrade} setPage={setPage}  />
          <SearchPack TABLE_ROWS={TABLE_ROWS} setTABLE_ROWS={setTABLE_ROWS} change={changeRow} setChange={setChangeRow} />
        </div>
      </CardHeader>
    </div>
  );
};

export default TableHead;
