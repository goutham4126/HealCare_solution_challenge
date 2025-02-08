"use server";

import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

export async function EditConsultation({ id, prescription }) {
  const user = await checkUser();
  if (!user) return { error: "Please login to edit prescriptions" };
  if (user.role !== "DOCTOR") return { error: "Only doctors can edit prescriptions" };

  try {
    const consultation = await db.consultation.update({
      where: { id },
      data: { prescription },
    });
    return consultation;
  } catch (error) {
    console.error("Error updating prescription:", error);
    return { error: "Error updating prescription" };
  }
}
