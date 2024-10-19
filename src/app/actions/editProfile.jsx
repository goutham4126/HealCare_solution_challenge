"use server";
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function editProfile(formData,doctorId) {
    const user=await checkUser();
    if(!user)
    {
        return {error:"Please login to find doctors"};
    }
  try {
    const updatedProfile = await db.user.update({
        where: { id: doctorId },
        data: { 
            doctorAge: formData.doctorAge,
            doctorPhone:formData.doctorPhone,
            doctorDescription:formData.doctorDescription,
            knownTreatment:formData.knownTreatment,
         },
      });
      return updatedProfile;
  } catch (error) {
    return { error: "Error updating user role" };
  }
}

export default editProfile;
