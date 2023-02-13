import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

export default function ({ selectedData = [{ x: 3, y: 4 }] }) {
  return (
    <div className="border-b border-gray-700  px-4 py-5 sm:px-6 bg-slate-100">
      <div style={{ width: "500px", height: "500px" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              data={selectedData}
              cursor="pointer"
            >
              <XAxis dataKey="x" name="x" />
              <YAxis dataKey="y" name="y" />

              <Line type="monotone" dataKey="y" stroke="#60A5FA" />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ payload, active }) => {
                  if (active) {
                    return (
                      <div className="p-2 border-spacing-2 bg-blend-color bg-blue-200 ">
                        <p>{`X = ${payload[0].payload.x}, Y = ${payload[0].payload.y}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
