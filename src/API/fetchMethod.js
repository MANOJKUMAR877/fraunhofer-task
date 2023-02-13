import axios from "axios";
let baseUrl = "http://localhost:3333/";

const fetchPointsAndCurves = async (type = "points") => {
  try {
    let data = await axios.get(`${baseUrl}${type}`);
    return data;
  } catch (error) {
    return error.response;
  }
};
export { fetchPointsAndCurves };
