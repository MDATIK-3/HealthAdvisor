function ExportHistory({ history }) {
    const exportHistory = () => {
      const csvRows = [
        ["ID", "BMI", "Date"],
        ...history.map((entry) => [entry.id, entry.bmi, entry.date]),
      ];
  
      const csvContent =
        "data:text/csv;charset=utf-8," +
        csvRows.map((row) => row.join(",")).join("\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "bmi_history.csv");
      document.body.appendChild(link);
      link.click();
    };
  
    return exportHistory;
  }
  
  export default ExportHistory;
  