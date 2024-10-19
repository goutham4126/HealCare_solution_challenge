import {  FaAngleRight } from "react-icons/fa"
import Link from "next/link";

async function Diseases() {
    const specialities=[
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-gynaecologist.svg",
            disease: "Gynaecology",
            link: "consultation",
        },
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-dermatologist.svg",
            disease: "Dermatology",
            link: "consultation",
        },
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-gp.svg",
            disease: "General Physician",
            link: "consultation",
        },
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-stomach.svg",
            disease: "Gastroenterology",
            link: "consultation",
        },
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-pediatric.svg",
            disease: "Pediatrics",
            link: "consultation",
        },
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-kidney.svg",
            disease: "Nephrology",
            link: "consultation",
        },
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-sexology.svg",
            disease: "Sexology",
            link: "consultation",
        },
        {
            image: "https://www.practo.com/consult/static/images/top-speciality-psychiatric.svg",
            disease: "Psychiatry",
            link: "consultation",
        },
    ]
  return (
        <div className="">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 leading-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-600">25+ specialities</h1>
                    <p className="text-gray-500 text-sm font-semibold">Consult top doctors across specialities</p>
                </div>
                <div>
                    <button className="border px-3 py-2 font-semibold text-sm rounded-lg mt-2"><Link href="/consultation">See all Specialities</Link></button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  gap-5 py-3">
                {
                    specialities.map((item,index)=>(
                        <div key={index} className="p-3 text-center rounded-lg" style={{boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                                <img src={item.image} alt="" className="rounded-full h-32 w-32 m-auto mb-4" />
                                <p className="font-semibold">{item.disease}</p>
                        </div>
                    ))
                }
            </div>
        </div>
  )
}

export default Diseases