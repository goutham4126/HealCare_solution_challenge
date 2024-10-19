import Link from 'next/link';
import { HiHome } from "react-icons/hi2";
import { FaVideo } from "react-icons/fa6";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FaSuitcaseMedical } from "react-icons/fa6";

function PatientSidebar() {
  
  const links = [
    {
      path: '/',
      name: 'Home',
      icon: <HiHome className="h-6 w-6" />
    },
    {
      path: '/consultation',
      name: 'Consultation',
      icon: <FaUserDoctor className="h-6 w-6" />
    },
    {
      path: '/prescription',
      name: 'Prescription',
      icon: <FaPrescriptionBottleMedical className="h-6 w-6" />
    },
    {
      path: 'https://healcare-videochat.vercel.app/',
      name: 'Video',
      icon: <FaVideo className="h-6 w-6" />
    },
    {
      path: '/careers',
      name: 'Career',
      icon: <FaSuitcaseMedical  className="h-6 w-6" />
    }
  ];

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-col p-2 gap-2">
        {links.map((link, index) => (
          <div key={index}>
            <Link
              href={link.path}
              style={{borderRadius:8}}
              className="flex items-center gap-3 font-semibold p-3 bg-teal-500 text-white"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientSidebar;
