// import { useState, useMemo } from "react";

// import ParticipantRow from "./components/ParticipantRow";
// import CostSummary from "./components/CostSummary";
// import Recommendation from "./components/Recommendation";
// import MeetingHistory from "./components/MeetingHistory";
// import {saveMeeting, getMeetings,} from "./services/meetingService";

// import { useEffect } from "react";
// function App() {
//   const [duration, setDuration] =
//     useState(60);

//   const [agenda, setAgenda] =
//     useState("");

//   const [participants, setParticipants] =
//     useState([
//       {
//         id: Date.now(),
//         name: "",
//         hourlyRate: "",
//       },
//     ]);

//   const [meetings, setMeetings] =
//     useState([]);

//   const addParticipant = () => {
//     setParticipants([
//       ...participants,
//       {
//         id: Date.now(),
//         name: "",
//         hourlyRate: "",
//       },
//     ]);
//   };

//   const deleteParticipant = (id) => {
//     setParticipants(
//       participants.filter(
//         (p) => p.id !== id
//       )
//     );
//   };

//   const updateParticipant = (
//     id,
//     field,
//     value
//   ) => {
//     setParticipants(
//       participants.map((p) =>
//         p.id === id
//           ? { ...p, [field]: value }
//           : p
//       )
//     );
//   };

//   const totalCost = useMemo(() => {
//     return participants.reduce(
//       (sum, person) => {
//         const rate =
//           Number(person.hourlyRate) || 0;

//         return (
//           sum +
//           (rate / 60) *
//             Number(duration)
//         );
//       },
//       0
//     );
//   }, [participants, duration]);

//   const saveMeeting = () => {
//     const newMeeting = {
//       id: Date.now(),
//       agenda,
//       duration,
//       totalCost,
//       date:
//         new Date().toLocaleString(),
//     };

//     setMeetings([
//       newMeeting,
//       ...meetings,
//     ]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

//         <h1 className="text-4xl font-bold mb-8">
//           Meeting Cost Calculator
//         </h1>

//         {/* Duration */}

//         <div className="mb-8">
//           <label className="block font-semibold mb-2">
//             Meeting Duration (Minutes)
//           </label>

//           <input
//             type="number"
//             value={duration}
//             onChange={(e) =>
//               setDuration(e.target.value)
//             }
//             className="border rounded-lg p-3 w-full"
//           />
//         </div>

//         {/* Participants */}

//         <h2 className="text-2xl font-bold mb-4">
//           Participants
//         </h2>

//         {participants.map(
//           (participant) => (
//             <ParticipantRow
//               key={participant.id}
//               participant={
//                 participant
//               }
//               onChange={
//                 updateParticipant
//               }
//               onDelete={
//                 deleteParticipant
//               }
//             />
//           )
//         )}

//         <button
//           onClick={addParticipant}
//           className="bg-blue-600 text-white px-5 py-2 rounded-lg"
//         >
//           Add Participant
//         </button>

//         <div className="mt-8">
//           <CostSummary
//             totalCost={totalCost}
//           />
//         </div>

//         {/* Agenda */}

//         <div className="mt-8">
//           <label className="block font-semibold mb-2">
//             Agenda
//           </label>

//           <input
//             type="text"
//             value={agenda}
//             onChange={(e) =>
//               setAgenda(e.target.value)
//             }
//             placeholder="Enter meeting agenda"
//             className="border rounded-lg p-3 w-full"
//           />
//         </div>

//         <div className="mt-8">
//           <Recommendation
//             cost={totalCost}
//             agenda={agenda}
//           />
//         </div>

//         <button
//           onClick={saveMeeting}
//           className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
//         >
//           Save Meeting
//         </button>

//         <MeetingHistory
//           meetings={meetings}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;



import { useState, useMemo, useEffect } from "react";

import ParticipantRow from "./components/ParticipantRow";
import CostSummary from "./components/CostSummary";
import Recommendation from "./components/Recommendation";
import MeetingHistory from "./components/MeetingHistory";

import {
  saveMeeting as saveMeetingAPI,
  getMeetings as getMeetingsAPI,
} from "./services/meetingService";

function App() {
  const [duration, setDuration] = useState(60);

  const [agenda, setAgenda] = useState("");

  const [participants, setParticipants] = useState([
    {
      id: Date.now(),
      name: "",
      hourlyRate: "",
    },
  ]);

  const [meetings, setMeetings] = useState([]);

  // Fetch Meetings from MongoDB
  const fetchMeetings = async () => {
    try {
      const data = await getMeetingsAPI();
      setMeetings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Add Participant
  const addParticipant = () => {
    setParticipants([
      ...participants,
      {
        id: Date.now(),
        name: "",
        hourlyRate: "",
      },
    ]);
  };

  // Delete Participant
  const deleteParticipant = (id) => {
    setParticipants(
      participants.filter((p) => p.id !== id)
    );
  };

  // Update Participant
  const updateParticipant = (
    id,
    field,
    value
  ) => {
    setParticipants(
      participants.map((p) =>
        p.id === id
          ? {
              ...p,
              [field]: value,
            }
          : p
      )
    );
  };

  // Calculate Total Cost
  const totalCost = useMemo(() => {
    return participants.reduce(
      (sum, person) => {
        const rate =
          Number(person.hourlyRate) || 0;

        return (
          sum +
          (rate / 60) *
            Number(duration)
        );
      },
      0
    );
  }, [participants, duration]);

  // Save Meeting to MongoDB
  const handleSaveMeeting = async () => {
    try {
      const meetingData = {
        agenda,
        duration,
        totalCost,
        participants,
      };

      await saveMeetingAPI(meetingData);

      alert("Meeting Saved Successfully");

      fetchMeetings();

      // Reset Form
      setAgenda("");
      setDuration(60);

      setParticipants([
        {
          id: Date.now(),
          name: "",
          hourlyRate: "",
        },
      ]);
    } catch (error) {
      console.log(error);
      alert("Failed to save meeting");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Meeting Cost Calculator
        </h1>

        {/* Duration */}

        <div className="mb-8">
          <label className="block font-semibold mb-2">
            Meeting Duration (Minutes)
          </label>

          <input
            type="number"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            className="border rounded-lg p-3 w-full"
          />
        </div>

        {/* Participants */}

        <h2 className="text-2xl font-bold mb-4">
          Participants
        </h2>

        {participants.map(
          (participant) => (
            <ParticipantRow
              key={participant.id}
              participant={participant}
              onChange={
                updateParticipant
              }
              onDelete={
                deleteParticipant
              }
            />
          )
        )}

        <button
          onClick={addParticipant}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Participant
        </button>

        {/* Cost */}

        <div className="mt-8">
          <CostSummary
            totalCost={totalCost}
          />
        </div>

        {/* Agenda */}

        <div className="mt-8">
          <label className="block font-semibold mb-2">
            Agenda
          </label>

          <input
            type="text"
            value={agenda}
            onChange={(e) =>
              setAgenda(e.target.value)
            }
            placeholder="Enter meeting agenda"
            className="border rounded-lg p-3 w-full"
          />
        </div>

        {/* Recommendation */}

        <div className="mt-8">
          <Recommendation
            cost={totalCost}
            agenda={agenda}
          />
        </div>

        {/* Save */}

        <button
          onClick={handleSaveMeeting}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Save Meeting
        </button>

        {/* History */}

        <MeetingHistory
          meetings={meetings}
        />
      </div>
    </div>
  );
}

export default App;