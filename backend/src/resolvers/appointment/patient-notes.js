import { prisma } from '@';

const patientNotes = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).PatientNotes();
};

export default patientNotes;
