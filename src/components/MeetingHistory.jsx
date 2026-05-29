
export default function MeetingHistory({
  meetings,
}) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Meeting History
      </h2>

      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        meetings.map((meeting) => (
          <div
            key={meeting._id}
            className="border p-4 rounded-xl mb-3"
          >
            <p>
              <strong>Agenda:</strong>{" "}
              {meeting.agenda}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {meeting.duration} mins
            </p>

            <p>
              <strong>Cost:</strong> ₹
              {meeting.totalCost}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                meeting.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}