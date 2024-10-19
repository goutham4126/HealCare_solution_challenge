"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DoctorById from "@/app/actions/getDoctorById";


export default function DoctorPage() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const id = pathname.split("/").pop(); 

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) return;

      try {
        const data = await DoctorById(id);
        if (data) {
          setDoctor(data);
        } else {
          setError("Error fetching doctor");
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-teal-600 font-bold">Loading doctor information...</div>;
  }

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  if (!doctor) {
    return <div className="text-gray-500">Doctor not found.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl rounded">
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <Image 
            src={doctor.imageUrl} 
            alt={doctor.name} 
            fill 
            className="rounded-full border-4 border-blue-300 shadow-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">{doctor.name}</h1>
          <p className="text-lg text-gray-600 mb-1">{doctor.email}</p>
          <p className="text-md text-gray-500">{doctor.doctorPhone}</p>
          <p className="text-md text-gray-500">Age: {doctor.doctorAge}</p>
        </div>
      </div>

      <div className="mt-4 p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Doctor Specialization</h2>
        <p className="text-teal-700 font-semibold text-lg mb-2">{doctor.knownTreatment}</p>
        <p className="text-gray-700 text-lg">{doctor.doctorDescription}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <Link 
          href={`/consultation/${doctor.id}/book`} 
          className="inline-block bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 text-white font-semibold text-lg px-8 py-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
