import React from "react";
import { Plus } from "lucide-react";

export function PlusButton() {
  return (
<button className=" w-7 h-7 rounded-full border border-P300 flex items-center justify-center text-P300 bg-P100 text-4xl " >
    <Plus size={40} strokeWidth={1.2} />
</button>
  );
}
