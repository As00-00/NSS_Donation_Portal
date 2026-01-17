"use client";

export default function DownloadBtn({ data }) {
  
  const handleDownload = () => {

    const headers = ["Date,Donor Name,Email,Amount (INR),Status,Transaction ID"];

    
    const rows = data.map(row => 
      `${row.date},"${row.donorName}","${row.donorEmail}",${row.amount},${row.status},${row.id}`
    );


    const csvContent = [headers, ...rows].join("\n");


    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `nss_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload}
      className="text-xs font-bold text-[#1a237e] hover:text-blue-800 hover:underline transition"
    >
      Download Report
    </button>
  );
}