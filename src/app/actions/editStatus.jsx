"use server";

import { db } from "@/lib/database";

export async function EditStatus(id, newStatus) {
  try {
    await db.consultation.update({
      where: { id },
      data: { status: newStatus },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
