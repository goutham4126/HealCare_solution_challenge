"use client";

import AddConsultation from "@/app/actions/addConsultation";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const path = usePathname();
  const segments = path.split("/");
  const id = segments[2];

  const onSubmit = async (data) => {
    const response = await AddConsultation({ data, id });
    if (!response.error) {
      alert("Successfully booked!");
    } else {
      alert(response.error || "Error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-lg shadow-lg border border-gray-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Book a Consultation</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Symptom */}
            <div>
              <Label htmlFor="symptom">Symptom or Health Problem</Label>
              <Input 
                id="symptom" 
                {...register("symptom", { required: true })} 
                placeholder="Enter symptom"
              />
              {errors.symptom && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            {/* Age */}
            <div>
              <Label htmlFor="age">Age</Label>
              <Input 
                type="number" 
                id="age" 
                {...register("age", { required: true })} 
                placeholder="Enter age"
              />
              {errors.age && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      value={g.toLowerCase()} 
                      {...register("gender", { required: true })}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input 
                type="tel" 
                id="mobile" 
                {...register("mobile", { required: true })} 
                placeholder="Enter mobile number"
              />
              {errors.mobile && <span className="text-red-500 text-xs">This field is required</span>}
            </div>

            {/* Stage & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Stage of Symptom */}
              <div>
                <Label htmlFor="stage">Stage of Symptom</Label>
                <Select {...register("stage", { required: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
                {errors.stage && <span className="text-red-500 text-xs">This field is required</span>}
              </div>

              {/* Appointment Date */}
              <div>
                <Label htmlFor="date">Appointment Date & Time</Label>
                <Input 
                  type="datetime-local" 
                  id="date" 
                  {...register("date", { required: true })} 
                />
                {errors.date && <span className="text-red-500 text-xs">This field is required</span>}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition text-white">
              Book Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
