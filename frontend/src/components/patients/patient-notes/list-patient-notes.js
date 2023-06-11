import { formatDate } from 'utils/date';
import * as R from 'ramda';
import { StyledEl, StyledLi, StyledUl } from './style';
const byDate = R.groupBy(function (note) {
  const date = formatDate(note.appointment.date, 'MM-DD-YYYY');
  return date;
});
const ListPatientNotes = ({ notes }) => {
  const updatesNotes = byDate(notes);
  console.log(updatesNotes, 'updatesNotes');
  return (
    <>
      <StyledUl>
        {Object.entries(updatesNotes)?.map(([key, value]) => (
          <>
            <StyledLi>{formatDate(key, 'DD-MMMM-YYYY')}</StyledLi>
            {value?.map(note => (
              <StyledEl> - {note?.text}</StyledEl>
            ))}
          </>
        ))}
      </StyledUl>
    </>
  );
};
export default ListPatientNotes;
