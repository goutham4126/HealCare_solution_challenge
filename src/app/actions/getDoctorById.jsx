"use server";
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function DoctorById(id) {
  const user = await checkUser();
  
  if (!user) {
    return { error: "Please login to find doctors" };
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        id: id,
        role: "DOCTOR",     
      },
    });

    if (!doctor) {
      return { error: "Doctor not found" };
    }

    return doctor;
  } catch (error) {
    return { error: "Error finding doctor" };
  }
}

export default DoctorById;
