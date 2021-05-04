import { getAllTransactionForCurrentOpenPayslips } from '@/services/payroll.service';

const payslips = async (_, __, { organizationId }) => {
  return getAllTransactionForCurrentOpenPayslips(organizationId);
};

export default payslips;
