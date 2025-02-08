import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AllConsultations from "@/app/actions/getConsultations";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/database";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import EditPrescriptionDialog from "@/components/EditPrescriptionDialog";
import StatusToggle from "@/components/StatusToggle"; 

async function UserConsultations() {
  const consultations = await AllConsultations();
  const userType = await checkUser();

  async function getName(id) {
    const user = await db.user.findUnique({ where: { id } });
    return user?.name || "Unknown person";
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Diagnosis</TableHead>
            {userType.role === "DOCTOR" && <TableHead>Share</TableHead>}
            <TableHead>Prescription</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {await Promise.all(
            consultations.map(async (consultation) => {
              const doctorName = await getName(consultation.doctorId);
              const patientName = await getName(consultation.patientId);

              return (
                <TableRow key={consultation.id}>
                  <TableCell>{patientName}</TableCell>
                  <TableCell>{doctorName}</TableCell>
                  <TableCell>{consultation.diagnosis}</TableCell>

                  {userType.role === "DOCTOR" && (
                    <TableCell>
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`https://web.whatsapp.com/send?phone=${consultation.patientPhoneNo}&text=${"This is the meet link to join :"}&app_absent=0`}
                        >
                          <FaWhatsapp className="h-4 w-4" />
                          <span className="sr-only">Share on WhatsApp</span>
                        </Link>
                      </Button>
                    </TableCell>
                  )}

                  <TableCell>
                    <EditPrescriptionDialog consultation={consultation} userType={userType.role} />
                  </TableCell>

                  <TableCell>
                    {
                      userType.role === "DOCTOR" ? (
                        <StatusToggle consultation={consultation} userType={userType.role} />
                      ) : (
                        <h1>{consultation.status}</h1>
                      )
                    }
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserConsultations;
