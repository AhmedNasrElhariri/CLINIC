import { prisma } from '@';

const updateNotes = async (
  _,
  { appointmentId, patientId, notes },
  { organizationId, userId }
) => {
  return prisma.patientNotes.create({
    data: Object.assign(
      {
        patient: { connect: { id: patientId } },
        text: notes,
        organization: { connect: { id: organizationId } },
      },
      appointmentId && { appointment: { connect: { id: appointmentId } } }
    ),
  });
};

export default updateNotes;
