import React from 'react';

export default function FeeTable() {
  const feeData = [
    {
      id: 1,
      class: "Nursery to UKG",
      installment1: "₹13,000/-",
      installment2: "₹13,000/-",
      installment3: "₹13,000/-",
      annual: "₹3,000/-",
      total: "₹42,000/-"
    },
    {
      id: 2,
      class: "I to IV",
      installment1: "₹15,000/-",
      installment2: "₹15,000/-",
      installment3: "₹15,000/-",
      annual: "₹4,000/-",
      total: "₹49,000/-"
    },
    {
      id: 3,
      class: "V to VIII",
      installment1: "₹17,500/-",
      installment2: "₹17,500/-",
      installment3: "₹17,500/-",
      annual: "₹4,500/-",
      total: "₹57,000/-"
    },
    {
      id: 4,
      class: "IX and X",
      installment1: "₹19,500/-",
      installment2: "₹19,500/-",
      installment3: "₹19,500/-",
      annual: "₹5,500/-",
      total: "₹64,000/-"
    },
    {
      id: 5,
      class: "XI/XII (COMMERCE & HUMANITIES)",
      installment1: "₹21,000/-",
      installment2: "₹21,000/-",
      installment3: "₹21,000/-",
      annual: "₹6,000/-",
      total: "₹69,000/-"
    },
    {
      id: 6,
      class: "XI & XII (PCM/PCB)",
      installment1: "₹22,500/-",
      installment2: "₹22,500/-",
      installment3: "₹22,500/-",
      annual: "₹6,000/-",
      total: "₹73,500/-"
    }
  ];

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-blue-100">
          
          <table className="w-full min-w-[900px] border-collapse text-center">
            
            {/* Table Head */}
            <thead className="bg-[#040F44] text-white font-semibold">
              {/* First Header Row */}
              <tr>
                <th 
                  rowSpan="2" 
                  className="p-4 border-r border-b border-blue-800/50 w-[80px] text-sm tracking-wide"
                >
                  S.No.
                </th>
                <th 
                  rowSpan="2" 
                  className="p-4 border-r border-b border-blue-800/50 w-[220px] text-sm tracking-wide"
                >
                  CLASS
                </th>
                <th 
                  colSpan="3" 
                  className="p-3 border-r border-b border-blue-800/50 text-sm tracking-wide"
                >
                  <div className="flex flex-col gap-1">
                    <span>TUITION FEES</span>
                    <span className="text-xs text-gray-300 font-normal">
                      (IN INSTALLMENTS - THREE INSTALLMENTS)
                    </span>
                  </div>
                </th>
                <th 
                  rowSpan="2" 
                  className="p-4 border-r border-b border-blue-800/50 w-[150px] text-sm tracking-wide"
                >
                  ANNUAL<br />ALLOCATION
                </th>
                <th 
                  rowSpan="2" 
                  className="p-4 border-b border-blue-800/50 w-[150px] text-sm tracking-wide"
                >
                  TOTAL
                </th>
              </tr>
              
              {/* Second Header Row (For Installments) */}
              <tr>
                <th className="p-3 text-xs sm:text-sm border-r border-b border-blue-800/50 tracking-wide font-medium bg-[#061556]">
                  I - INSTALLMENT
                </th>
                <th className="p-3 text-xs sm:text-sm border-r border-b border-blue-800/50 tracking-wide font-medium bg-[#061556]">
                  II - INSTALLMENT
                </th>
                <th className="p-3 text-xs sm:text-sm border-r border-b border-blue-800/50 tracking-wide font-medium bg-[#061556]">
                  III - INSTALLMENT
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-[#1e293b] text-[15px]">
              {feeData.map((row) => (
                <tr 
                  key={row.id} 
                  className="bg-[#FAFBFF] hover:bg-blue-50/50 transition-colors duration-200"
                >
                  {/* S.No */}
                  <td className="p-4 border border-blue-100 font-medium">
                    {row.id}
                  </td>
                  
                  {/* Class Name */}
                  <td className="p-4 border border-blue-100 font-medium">
                    {row.class}
                  </td>
                  
                  {/* Installments */}
                  <td className="p-4 border border-blue-100 text-gray-700">
                    {row.installment1}
                  </td>
                  <td className="p-4 border border-blue-100 text-gray-700">
                    {row.installment2}
                  </td>
                  <td className="p-4 border border-blue-100 text-gray-700">
                    {row.installment3}
                  </td>
                  
                  {/* Annual */}
                  <td className="p-4 border border-blue-100 text-gray-700 font-medium">
                    {row.annual}
                  </td>
                  
                  {/* Total (Bold Green) */}
                  <td className="p-4 border border-blue-100 font-bold text-green-700 text-base">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}