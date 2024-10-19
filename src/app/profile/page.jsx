import DoctorProfile from '@/components/DoctorProfile'
import { checkUser } from '@/lib/checkUser'

async function page() {
    const user=await checkUser();
  return (
    <div>
        <DoctorProfile user={user}/>
    </div>
  )
}

export default page