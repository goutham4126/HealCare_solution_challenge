"use server"
import { db } from "@/lib/database";
import { checkUser } from "@/lib/checkUser";

async function AddConsultation({data,id})
{
    const user=await checkUser();
    if(!user)
    {
        return {error:"Please login to find doctors"};
    }
    try{
        const { symptom, age, gender, mobile, date,stage } = data;
        const ageInt = parseInt(age, 10);
        const dateTime = new Date(date);
        const consultation= await db.consultation.create({
            data:{
                doctorId: id,
                patientId:user.id,
                diagnosis: symptom,
                gender,
                age:ageInt,
                patientPhoneNo: mobile,
                date:dateTime,
                status:"ACTIVE",
                stage:stage
            }
        })
        return consultation;
    }
    catch(error)
    {
        return {error:"Error finding doctors"};
    }
}

export default AddConsultation;