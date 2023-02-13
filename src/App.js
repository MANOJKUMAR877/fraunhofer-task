import React, { useState, useEffect } from "react";
import "./App.css";
import LineCharts from "./components/chart/LineCharts";
import ScatterChart from "./components/chart/ScatterChart";
import Modal from "./components/Modal";
import SnakeBar from "./components/SnakeBar";

import { fetchPointsAndCurves } from "./API/fetchMethod";

function App() {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState([]);
  const [modalValue, setModalValue] = useState("");
  const [selectedPoint, setSelectedPoint] = useState(false);
  const [selectedPointValue, setSelectedPointValue] = useState("");
  const [curveId, setCurveId] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  //API Call 
  useEffect(() => {
    fetchPointsAndCurves("points").then((res) => setPoints(res.data));
  }, []);
//left click function
  const handlePointClick = (point) => {
    setModalValue(point);
    setOpen(true);
  };
//right click function
  const handleContext = async (point) => {
    let { id } = point;
    setCurveId(id);
    let values = await fetchPointsAndCurves(`curves/${id}`);

    let { data } = values || {};
    if (JSON.stringify(data) != "{}") {
      const curvePlots = data.x.map((item, index) => {
        return { x: item, y: data.y[index] };
      });
      setSelectedPoint(true);
      setSelectedData(curvePlots);
      setSelectedPointValue("");
    } else {
      setSelectedPoint(false);
      setSelectedPointValue(`No Curves found for this ID ${id}`);
    }
  };

  let scatterChartProps = {
    points: points,
    handleContext: handleContext,
    handlePointClick: handlePointClick,
  };

  let modalProps = {
    open: open,
    setOpen: setOpen,
    modalValue: modalValue,
  };

  let lineChartProps = {
    curveId: curveId,
    selectedData: selectedData,
  };

  return (
    // Scatter chart and Modal box are rendering
    <>
      {points.length > 0 ? (
        <div className="flex flex-row p-10 ">
          <div className="flex-initial w-1/2 p-10 border-2 border-gray-200 border-dashed h-100 basis-1/2">
            <SnakeBar value={`Scatter Chart`} />
            <ScatterChart {...scatterChartProps} />
            <Modal {...modalProps} />
          </div>
          {/* line  chart rendering based on the right click values */}

          {selectedPoint ? (
            <div
              className="flex-initial w-1/2 h-full p-10 border-2 border-gray-200 border-dashed basis-1/2"
              aria-hidden="true"
            >
              <SnakeBar value={`ID = ${curveId}`} />
              <LineCharts {...lineChartProps} />{" "}
            </div>
          ) : (
            <div className="p-28">
              <SnakeBar
                value={
                  selectedPointValue
                    ? selectedPointValue
                    : "Please Right click the point to see the corresponding curve"
                }
              />
            </div>
          )}
        </div>
      ) : (
        <SnakeBar value="No Data Found" />
      )}
    </>
  );
}

export default App;
