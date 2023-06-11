import { prisma } from '@';

const updateNotes = async (
  _,
  { appointmentId, patientId, notes },
  { organizationId, userId }
) => {
  return prisma.patientNotes.create({
    data: {
      appointment: { connect: { id: appointmentId } },
      patient: { connect: { id: patientId } },
      text: notes,
      organization: { connect: { id: organizationId } },
    },
  });
};

export default updateNotes;
