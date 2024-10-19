"use client";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";

function Career() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/mail', data);
      reset();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const clearForm = () => {
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg mx-auto">
      <p className="mb-6 text-center text-gray-700 text-lg font-medium">
        Wanna become a doctor? Please fill out the form below. Team Healthcare will contact you as soon as possible.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-800">Name:</span>
          <input
            type="text"
            {...register('name', { required: true })}
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <span className="text-red-500 mt-1">Name is required</span>}
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-800">Email:</span>
          <input
            type="email"
            {...register('email', { required: true })}
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <span className="text-red-500 mt-1">Email is required</span>}
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-800">Phone Number:</span>
          <input
            type="tel"
            {...register('phone', { required: true })}
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && <span className="text-red-500 mt-1">Phone number is required</span>}
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-800">Education:</span>
          <input
            type="text"
            {...register('education', { required: true })}
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.education ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.education && <span className="text-red-500 mt-1">Education is required</span>}
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-800">Treatment Specialization:</span>
          <input
            type="text"
            {...register('treatment', { required: true })}
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.treatment ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.treatment && <span className="text-red-500 mt-1">Treatment specialization is required</span>}
        </label>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('agreement', { required: true })}
            className="mr-2"
          />
          <span className="text-gray-700">I agree that the above information is correct to my knowledge</span>
        </label>
        {errors.agreement && <span className="text-red-500">You must agree to the statement above</span>}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full mr-2 hover:bg-blue-600 transition"
          >
            Send Mail
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="bg-gray-300 text-black p-2 rounded w-full ml-2 hover:bg-gray-400 transition"
          >
            Clear Form
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Career;
