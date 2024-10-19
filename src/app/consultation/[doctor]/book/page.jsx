"use client";
import AddConsultation from "@/app/actions/addConsultation";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";

function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const path=usePathname();
  const segments = path.split("/");
  const id = segments[2];
  const onSubmit = async(data) => {
    const response=await AddConsultation({data,id});
    if(!response.error)
    {
      alert("Successfull");
    }
    else
    {
      alert(response.error || "Error occurred");
    }
  };

  return (
    <div className="p-5 flex justify-center items-center mx-auto max-w-lg w-full bg-teal-500 rounded">
      <div className="max-w-lg w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="symptom" className="block text-sm font-medium text-gray-700 mb-1">Symptom or Health Problem</label>
              <input 
                type="text" 
                id="symptom" 
                className="border-2 outline-none p-2 rounded w-full"
                {...register("symptom", { required: true })}
              />
              {errors.symptom && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input 
                type="number" 
                id="age" 
                className="border-2 outline-none p-2 rounded w-full"
                {...register("age", { required: true })}
              />
              {errors.age && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input 
                    type="radio" 
                    value="male" 
                    {...register("gender", { required: true })} 
                    className="mr-2" 
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input 
                    type="radio" 
                    value="female" 
                    {...register("gender", { required: true })} 
                    className="mr-2" 
                  />
                  Female
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="other" 
                    {...register("gender", { required: true })} 
                    className="mr-2" 
                  />
                  Other
                </label>
              </div>
              {errors.gender && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                id="mobile" 
                className="border-2 outline-none p-2 rounded w-full"
                {...register("mobile", { required: true })}
              />
              {errors.mobile && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="flex gap-3 flex-col md:flex-row w-full">
              <div className="mb-4 md:w-1/2">
                <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">Stage of Symptom</label>
                <select 
                  id="stage" 
                  className="border-2 outline-none p-2 rounded w-full"
                  {...register("stage", { required: true })}
                >
                  <option value="">Select Stage</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
                {errors.stage && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              
              <div className="mb-4 md:w-1/2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Appointment Date & Time</label>
                <input 
                  type="datetime-local" 
                  id="date" 
                  className="border-2 outline-none p-2 rounded w-full"
                  {...register("date", { required: true })}
                />
                {errors.date && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
            </div>

            <button className="bg-blue-900 text-white py-2 px-4 rounded text-sm font-semibold">
              Book appointment
            </button>
          </form>
      </div>
    </div>
  );
}

export default Page;
