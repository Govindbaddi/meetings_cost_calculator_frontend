// import axios from "axios";

// const API =
//   "http://localhost:5000/api/meetings";

// export const saveMeeting = async (
//   meeting
// ) => {
//   const response = await axios.post(
//     API,
//     meeting
//   );

//   return response.data;
// };

// export const getMeetings = async () => {
//   const response = await axios.get(API);

//   return response.data.data;
// };


import axios from "axios";

const BASE_URL =
  "http://localhost:5000/api/meetings";

export const saveMeeting = async (
  meetingData
) => {
  const response = await axios.post(
    `${BASE_URL}/create`,
    meetingData
  );

  return response.data;
};

export const getMeetings = async () => {
  const response = await axios.get(
    `${BASE_URL}/fetch`
  );

  return response.data.data;
};