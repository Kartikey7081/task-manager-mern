import { IoMdCheckboxOutline } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";

const Header = ({ onAddClick,onStatsClick,showStats,doneCount,remainingCount }) => {
  return (
    <div className="flex justify-between items-center px-4 py-3">

      {/* Left Section */}
      <div className="flex items-center gap-2 text-red-600 font-bold text-2xl">
        <IoMdCheckboxOutline className="text-3xl" />
        <h1>Task</h1>
      </div>

      {/* Middle Section */}
      <div className="flex gap-6 text-gray-600 text-sm">
        <p className="flex gap-1">
Done <span className="font-bold text-green-400">{doneCount}</span>        </p>
        <p className="flex gap-1">
Remaining <span className="font-bold text-yellow-400">
  {remainingCount}
</span>        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        <button onClick={onStatsClick} className="flex items-center gap-2 px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-100">
          <FaChartBar />
        {showStats ? "Hide Stats" : "Show Stats"}
        </button>

        <button   onClick={onAddClick}
 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          + New Task
        </button>

      </div>
      

    </div>
  );
};

export default Header;