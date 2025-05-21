import { LayoutGrid, List, Table as TableIcon } from "lucide-react";
import React from "react";

const ViewMode = ({ mode, setViewMode }) => {
  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2 rounded-md transition-colors ${
          mode === "grid"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-2 rounded-md transition-colors ${
          mode === "list"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        <List size={20} />
      </button>
      {/* <button
        onClick={() => setViewMode("table")}
        className={`p-2 rounded-md transition-colors ${
          mode === "table"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        <TableIcon size={20} />
      </button> */}
    </div>
  );
};

export default ViewMode;