import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ({
  points = [{ row: 3, col: 4 }],
  handleContext = () => {},
  handlePointClick = () => {},
}) {
  return (
    <div className="border-b border-gray-700  px-4 py-5 sm:px-6 bg-slate-200 ">
      <div style={{ width: "500px", height: "500px" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="col" name="col" />
              <YAxis dataKey="row" name="row" />
              <Scatter
                name="Scatter Plot"
                data={points}
                fill="#60A5FA"
                onContextMenu={handleContext}
                onClick={handlePointClick}
                cursor="pointer"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 4" }}
                content={({ payload, active }) => {
                  if (active) {
                    return (
                      <div className="p-2   bg-blue-200 ">
                        <p>{`ID =  ${payload[0].payload.id}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
