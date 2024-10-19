"use server";
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function updateUserRole({editingUserId,newRole}) {
    const user=await checkUser();
    if(!user)
    {
        return {error:"Please login to find doctors"};
    }
  try {
    const updatedUser = await db.user.update({
        where: { id: editingUserId },
        data: { role: newRole },
      });
      return updatedUser;
  } catch (error) {
    return { error: "Error updating user role" };
  }
}

export default updateUserRole;
