import UserConsultations from "@/components/UserConsultations";
import AllDoctors from "../actions/getAllDoctors";
import Link from "next/link";

async function DoctorList() {
  const doctors = await AllDoctors();

  if (doctors?.error) {
    return <div className="text-red-500 font-semibold">{doctors.error}</div>;
  }

  if (doctors.length === 0) {
    return <div className="text-gray-500 font-medium">No doctors found</div>;
  }

  return (
    <div className="mb-[50vh] p-4 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
        {doctors?.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-gradient-to-r z-10 from-teal-50 to-white shadow-lg rounded-lg p-6 border hover:shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900">{doctor.name}</h3>
            <p className="text-gray-700 mt-2"><b>Speciality : </b> {doctor.knownTreatment}</p>
            <p className="text-gray-600 mt-2">{doctor.doctorDescription}</p>
            <div className="mt-5 flex gap-3">
              <Link
                href={`/consultation/${doctor.id}`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Profile
              </Link>
              <Link
                href={`/consultation/${doctor.id}/book`}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded shadow-md hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Book
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">Previous Consultations:</h1>
      <div>
        <UserConsultations />
      </div>
    </div>
  );
}

export default DoctorList;
