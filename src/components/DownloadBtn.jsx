"use client";

import { Download } from "lucide-react";

export default function DownloadBtn({ data = [], fileName = "report", label = "Export CSV" }) {
  
  const handleDownload = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }


    const headers = Object.keys(data[0]);
    
    
    const csvContent = [
      headers.join(","), 
      ...data.map(row => headers.map(fieldName => {
      
        const val = row[fieldName] ? row[fieldName].toString().replace(/"/g, '""') : "";
        return `"${val}"`;
      }).join(",")) 
    ].join("\n");

    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload}
      className="flex items-center gap-2 text-xs font-bold bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition shadow-sm"
    >
      <Download size={14} /> {label}
    </button>
  );
}