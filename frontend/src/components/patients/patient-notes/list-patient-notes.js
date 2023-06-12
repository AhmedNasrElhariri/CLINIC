import { formatDate } from 'utils/date';
import * as R from 'ramda';
import { StyledEl, StyledLi, StyledUl } from './style';
import { StyledDeleteIcon } from './style';
import { Div } from 'components';
const byDate = R.groupBy(function (note) {
  const date = formatDate(note?.appointment?.date, 'MM-DD-YYYY');
  return note?.appointment ? date : 'Patient';
});

const ListPatientNotes = ({ notes, onDeleteNote }) => {
  const updatesNotes = byDate(notes);
  return (
    <>
      <StyledUl>
        {Object.entries(updatesNotes)?.map(([key, value]) => (
          <>
            <StyledLi>
              {key == 'Patient' ? 'Patient' : formatDate(key, 'DD-MMMM-YYYY')}
            </StyledLi>
            {value?.map(note => (
              <Div display="flex" justifyContent="space-between">
                <StyledEl> - {note?.text}</StyledEl>{' '}
                <StyledDeleteIcon onClick={() => onDeleteNote(note)} />
              </Div>
            ))}
          </>
        ))}
      </StyledUl>
    </>
  );
};
export default ListPatientNotes;
