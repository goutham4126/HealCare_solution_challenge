import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UserConsultations from "@/components/UserConsultations"
import AllDoctors from "../actions/getAllDoctors"
import Link from "next/link"

async function DoctorList() {
  const doctors = await AllDoctors()

  if (doctors?.error) {
    return <div className="text-destructive font-semibold">{doctors.error}</div>
  }

  if (doctors.length === 0) {
    return <div className="text-muted-foreground font-medium">No doctors found</div>
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {doctors?.map((doctor) => (
          <Card key={doctor.id}>
            <CardHeader>
              <CardTitle>{doctor.name}</CardTitle>
              <CardDescription>{doctor.knownTreatment}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{doctor.doctorDescription}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline" className="rounded">
                <Link href={`/consultation/${doctor.id}`}>Profile</Link>
              </Button>
              <Button asChild className="rounded bg-teal-600">
                <Link href={`/consultation/${doctor.id}/book`}>Book</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Previous Consultations</h2>
        <UserConsultations />
      </div>
    </div>
  )
}

export default DoctorList

