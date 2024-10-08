
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import BsPlus from "./BsPlus";

function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus/>
      <IoEllipsisVertical className="fs-4" />
    </div>
);}

export default ModuleControlButtons
