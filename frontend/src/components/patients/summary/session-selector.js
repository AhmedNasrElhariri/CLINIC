export default function SessionSelector({
  activeSession,
  setActiveSession,
  updatedSummary,
  t,
}) {
  return (
    <div className="flex gap-3 items-center md:!hidden sm:pl-4">
      <label>Session:</label>
      <select
        className="grow p-1"
        defaultValue={activeSession.id}
        onChange={event =>
          setActiveSession(
            updatedSummary.find(session => session.id === event.target.value)
          )
        }
      >
        {updatedSummary.map((session, i) => (
          <option key={i} value={session.id}>{`${t('session')} ${
            updatedSummary.length - i
          }`}</option>
        ))}
      </select>
    </div>
  );
}
