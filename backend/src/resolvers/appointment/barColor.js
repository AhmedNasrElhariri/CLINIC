import { prisma } from '@';

const barColor = ({ referedDoctor }) => {
  if (referedDoctor) {
    return 'danger';
  }
};

export default barColor;
