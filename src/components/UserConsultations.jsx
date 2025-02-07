import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import AllConsultations from "@/app/actions/getConsultations"
import { checkUser } from "@/lib/checkUser"
import { db } from "@/lib/database"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"

async function UserConsultations() {
  const consultations = await AllConsultations()
  const userType = await checkUser()

  async function getName(id) {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    })
    return user?.name || "Unknown person"
  }

  const now = new Date()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Diagnosis</TableHead>
            {userType.role === "DOCTOR" && <TableHead>Share</TableHead>}
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            await Promise.all(
              consultations?.map(async (consultation) => {
                const doctorName = await getName(consultation.doctorId)
                const patientName = await getName(consultation.patientId)
                const status = now >= new Date(consultation.date) ? "COMPLETED" : "PENDING"
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
                    <TableCell>{status}</TableCell>
                  </TableRow>
                )
              }),
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default UserConsultations

