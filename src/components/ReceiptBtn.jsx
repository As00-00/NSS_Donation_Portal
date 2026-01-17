"use client";

import jsPDF from "jspdf";

export default function ReceiptBtn({ donation, donorName }) {

  const generatePDF = () => {
    const doc = new jsPDF();


    doc.setFillColor(26, 35, 126); 
    doc.rect(0, 0, 210, 40, "F"); 

    doc.setTextColor(255, 255, 255); 
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("National Service Scheme", 105, 20, null, null, "center");
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Donation Receipt", 105, 30, null, null, "center");

    doc.setTextColor(0, 0, 0); 
    doc.setFontSize(12);
    doc.text(`Receipt ID: ${donation.id.substring(0, 10).toUpperCase()}`, 140, 50);
    doc.text(`Date: ${donation.date}`, 140, 57);


    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Received with thanks from:", 20, 70);
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(donorName, 20, 80);


    doc.setDrawColor(200, 200, 200);
    doc.line(20, 90, 190, 90); 

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Amount Donated:", 20, 105);
    
    doc.setFontSize(20);
    doc.setTextColor(26, 35, 126); 
    doc.text(`INR ${donation.amount}/-`, 80, 105);

    doc.setTextColor(0, 0, 0);
    doc.line(20, 115, 190, 115); 


    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("This is a computer-generated receipt and does not require a signature.", 105, 140, null, null, "center");
    doc.text("Thank you for your generous support towards social service.", 105, 145, null, null, "center");


    doc.save(`NSS_Receipt_${donation.date}.pdf`);
  };

  return (
    <button 
      onClick={generatePDF}
      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded border border-gray-300 transition"
    >
      Download Receipt
    </button>
  );
}