import { IoMdCheckboxOutline } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";

const Header = ({ onAddClick,onStatsClick,showStats,doneCount,remainingCount }) => {
  return (
<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4 py-4 bg-gray-900 rounded-xl shadow-md mb-6">
      {/* Left Section */}
      <div className="flex items-center gap-2 text-red-600 font-bold text-2xl">
        <IoMdCheckboxOutline className="text-3xl" />
        <h1>Tasky</h1>
      </div>

      {/* Middle Section */}
   <div className="flex flex-wrap gap-4 text-gray-400 text-xs md:text-sm">
        <p className="flex gap-1">
Done <span className="font-bold text-green-400">{doneCount}</span>        </p>
        <p className="flex gap-1">
Remaining <span className="font-bold text-yellow-400">
  {remainingCount}
</span>        </p>
      </div>

      {/* Right Section */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
        <button onClick={onStatsClick} className="flex items-center justify-center gap-2 px-3 py-2 border rounded-md text-gray-300 hover:bg-gray-800 transition-all w-full sm:w-auto">
          <FaChartBar />
        {showStats ? "Hide Stats" : "Show Stats"}
        </button>

        <button   onClick={onAddClick}
className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all w-full sm:w-auto">
          + New Task
        </button>

      </div>
      

    </div>
  );
};

export default Header;