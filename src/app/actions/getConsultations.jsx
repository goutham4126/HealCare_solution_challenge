"use server"
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function AllConsultations()
{
    const user=await checkUser();
    if(!user)
    {
        return {error:"Please login to find consultations"};
    }
    try{
        if(user?.role==="PATIENT")
        {
            const doctors=await db.consultation.findMany({
                where:{
                    patientId:user.id
                }
            })
            return doctors;
        }
        else if(user?.role==="DOCTOR")
        {
            const doctors=await db.consultation.findMany({
                where:{
                    doctorId:user.id
                }
            })
            return doctors;
        }
    }
    catch(error)
    {
        return {error:"Error finding consultations"};
    }
}

export default AllConsultations;