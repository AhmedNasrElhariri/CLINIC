export default function SessionSelector({
  activeSession,
  setActiveSession,
  updatedSummary,
  t,
}) {
  return (
    <div className="flex gap-3 items-center xl:!hidden sm:pl-4">
      <label>Surgery:</label>
      <select
        className="grow p-1 max-w-sm"
        defaultValue={activeSession.id}
        onChange={event =>
          setActiveSession(
            updatedSummary.find(session => session.id === event.target.value)
          )
        }
      >
        {updatedSummary.map((session, i) => (
          <option key={i} value={session.id}>{`${t('surgery')} ${
            updatedSummary.length - i
          }`}</option>
        ))}
      </select>
    </div>
  );
}
