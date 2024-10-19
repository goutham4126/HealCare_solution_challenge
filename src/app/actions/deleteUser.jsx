"use server";
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function deleteUser(userId) {
    const user=await checkUser();
    if(!user)
    {
        return {error:"Please login to find doctors"};
    }
  try {
    await db.user.delete({
      where: { id: userId },
    });
    return { success: true };
  } catch (error) {
    return { error: "Error deleting user" };
  }
}

export default deleteUser;
