import AllConsultations from "@/app/actions/getConsultations";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/database";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";


async function UserConsultations() {
  const consultations = await AllConsultations();
  const userType=await checkUser();
  async function getName(id) {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user?.name || "Unknown person";
  }
  const now = new Date();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left p-4 font-semibold text-gray-800">Patient Name</th>
            <th className="text-left p-4 font-semibold text-gray-800">Doctor Name</th>
            <th className="text-left p-4 font-semibold text-gray-800">Diagnosis</th>
            {
               userType.role==="DOCTOR"&&
               <th className="text-left p-4 font-semibold text-gray-800">Share</th>
            }
            <th className="text-left p-4 font-semibold text-gray-800">Status</th>
          </tr>
        </thead>
        <tbody>
          {await Promise.all(
            consultations?.map(async (consultation) => {
              const doctorName = await getName(consultation.doctorId);
              const patientName = await getName(consultation.patientId);
              const status = now >= new Date(consultation.date) ? "COMPLETED" : "PENDING";
              return (
                <tr key={consultation.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800">{patientName}</td>
                  <td className="p-4 text-gray-800">{doctorName}</td>
                  <td className="p-4 text-gray-600">{consultation.diagnosis}</td>
                  {
                   userType.role==="DOCTOR"&&
                    <td className="p-4 text-gray-600"><Link href={`https://web.whatsapp.com/send?phone=${consultation.patientPhoneNo}&text=${"This is the meet link to join :"}&app_absent=0`}><FaWhatsapp className="h-6 w-6"/></Link></td>
                  }
                  <td className="p-4 text-gray-600">{status}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserConsultations;
