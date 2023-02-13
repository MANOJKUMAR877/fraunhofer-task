import React from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
export default function SnakeBar({ value = "" }) {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex justify-center">
          <p className="text-sm text-blue-700">{value}</p>
        </div>
      </div>
    </div>
  );
}
