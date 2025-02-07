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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 font-semibold text-center mt-10">{error}</div>;
  }

  if (!doctor) {
    return <div className="text-gray-500 text-center mt-10">Doctor not found.</div>;
  }

  return (
    <div className="flex">
      <div className="w-full max-w-3xl p-8">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{doctor.name}</h1>
            <p className="text-lg text-gray-600">{doctor.email}</p>
            <p className="text-md text-gray-500 mt-1">📞 {doctor.doctorPhone}</p>
            <p className="text-md text-gray-500">🎂 Age: {doctor.doctorAge}</p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-white/90 shadow-sm rounded-xl border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Doctor Specialization</h2>
          <p className="text-lg text-teal-700 font-semibold">{doctor.knownTreatment}</p>
          <p className="text-gray-700 text-lg mt-2">{doctor.doctorDescription}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href={`/consultation/${doctor.id}/book`}
            className="inline-block bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-md transition-all transform hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-teal-300"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
