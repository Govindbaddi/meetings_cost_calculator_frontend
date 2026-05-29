export default function ParticipantRow({
  participant,
  onChange,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-12 gap-3 mb-3">
      <input
        type="text"
        placeholder="Name"
        value={participant.name}
        onChange={(e) =>
          onChange(
            participant.id,
            "name",
            e.target.value
          )
        }
        className="col-span-5 border rounded-lg p-2"
      />

      <input
        type="number"
        placeholder="Hourly Rate"
        value={participant.hourlyRate}
        onChange={(e) =>
          onChange(
            participant.id,
            "hourlyRate",
            e.target.value
          )
        }
        className="col-span-5 border rounded-lg p-2"
      />

      <button
        onClick={() =>
          onDelete(participant.id)
        }
        className="col-span-2 bg-red-500 text-white rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}