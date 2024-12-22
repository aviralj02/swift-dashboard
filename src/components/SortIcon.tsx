import { ChevronDown, ChevronUp } from "lucide-react";
import { SortOrder } from "../types/enums";

type Props = {
  sortOrder: SortOrder | null;
  isActive: boolean;
};

const SortIcon = ({ sortOrder, isActive }: Props) => {
  return (
    <div className="flex flex-col">
      <ChevronUp
        className={`w-3 h-auto -mb-0.5 ${
          sortOrder === SortOrder.ASC && isActive ? "text-gray-300" : ""
        }`}
      />
      <ChevronDown
        className={`w-3 h-auto -mb-0.5 ${
          sortOrder === SortOrder.DESC && isActive ? "text-gray-300" : ""
        }`}
      />
    </div>
  );
};

export default SortIcon;
