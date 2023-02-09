const ReportRow = ({ children }) => {
  return (
    <div className="flex flex-wrap bg-slate-100 px-3 py-5 items-center gap-5 border border-slate-900/20 border-solid">
      {children}
    </div>
  );
};
export default ReportRow;
