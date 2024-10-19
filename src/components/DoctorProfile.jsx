"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import editProfile from "@/app/actions/editProfile";
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function DoctorProfile({ user }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      doctorPhone: user.doctorPhone,
      doctorAge: user.doctorAge,
      doctorDescription: user.doctorDescription,
      knownTreatment: user.knownTreatment,
    },
  });

  const doctorId = user.id;

  const onSubmit = async (formData) => {
    setLoading(true);
    const response = await editProfile(formData, doctorId);
    
    setLoading(false);

    if (response.error) {
      toast.error(response.error || "Error updating profile");
    } else {
      toast.success("Profile updated successfully");
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Doctor Profile</CardTitle>
        <CardDescription>Update the doctor information below:</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <img 
            src={user.imageUrl} 
            alt={`${user.name}'s profile`} 
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="doctorPhone" className="block mb-1">Doctor Phone:</label>
            <input
              type="text"
              id="doctorPhone"
              {...register("doctorPhone", { required: "Phone number is required" })}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="doctorAge" className="block mb-1">Doctor Age:</label>
            <input
              type="number"
              id="doctorAge"
              {...register("doctorAge", { required: "Age is required" })}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="doctorDescription" className="block mb-1">Doctor Description:</label>
            <textarea
              id="doctorDescription"
              {...register("doctorDescription")}
              className="border rounded p-2 w-full"
              rows="3"
            />
          </div>
          <div>
            <label htmlFor="knownTreatment" className="block mb-1">Known Treatments:</label>
            <textarea
              id="knownTreatment"
              {...register("knownTreatment")}
              className="border rounded p-2 w-full"
              rows="3"
            />
          </div>
          <button 
            type="submit" 
            className={`mt-4 bg-blue-500 text-white rounded p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </CardContent>
      <CardFooter className="text-sm">
        <div>Update your profile information carefully.</div>
      </CardFooter>
      <Toaster position="top-center" />
    </Card>
  );
}
