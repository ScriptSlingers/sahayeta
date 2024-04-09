'use client'
import { useClientSession } from "@sahayeta/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { hash, compare } from 'bcryptjs';

export default function ChangePassword() {
  const currentUser = useClientSession();
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    const fetchSessionUser = async () => {
      try {
        const response = await axios.get(`/api/users/${currentUser.id}`);
        setSessionUser(response.data);
      } catch (error) {
        console.error('Error fetching session user:', error);
      }
    };

    if (currentUser) {
      fetchSessionUser();
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const watchPassword = watch("newPassword", "");

  const handleEdit = async values => {
    try {
      const { oldPassword, newPassword, confirmPassword, ...rest } = values;

      // Verify old password
      const isOldPasswordValid = await compare(oldPassword, sessionUser.password);

      if (!isOldPasswordValid) {
        toast.error('Old password is incorrect');
        return;
      }

      // Verify new password matches confirm password
      if (newPassword !== confirmPassword) {
        toast.error('New password and confirm password do not match');
        return;
      }

      // Hash new password
      const hashed_password = await hash(newPassword, 12);

      // Prepare updated values
      const editedValues = {
        ...rest,
        password: hashed_password
      };

      // Update password
      await axios.patch(
        `/api/users/${currentUser.id}`,
        editedValues,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      );

      toast.success(`Password Updated Successfully`);
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Please try again later.');
    }
  };

  return (
    <div className="flex w-full flex-col rounded bg-blue-50">
      <div className="container flex">
        <div className="flex w-2/3 flex-col rounded-xl  bg-slate-200 ">
          <div className="m-5 flex flex-col justify-center rounded-xl bg-white p-8">
            <span className="mb-3 text-4xl font-bold">
              Change your Password
            </span>
            <span className="mb-8 font-light text-gray-400">
              Enter your new password below to change your password
            </span>
            <form onSubmit={handleSubmit(handleEdit)} className="flex flex-col">
              <div className="mt-2 ">
                <p>Old Password</p>
                <input
                  {...register("oldPassword", { required: true })}
                  className="w-full rounded-lg border border-slate-500 p-2 text-sm text-black outline-none"
                  type="password"
                  id="oldPassword"
                  placeholder="Old password"
                  required
                />
                {errors.oldPassword && <span className="text-red-500">Old password is required</span>}
              </div>
              <div className="mt-2 ">
                <p>New Password</p>
                <input
                  {...register("newPassword", { required: true })}
                  className="w-full rounded-lg border border-slate-500 p-2 text-sm text-black outline-none"
                  type="password"
                  id="newPassword"
                  placeholder="New password"
                  required
                />
                {errors.newPassword && <span className="text-red-500">New password is required</span>}
              </div>
              <div className="mt-2">
                <p>Confirm Password</p>
                <input
                  {...register("confirmPassword", { required: true, validate: value => value === watchPassword })}
                  className="w-full rounded-lg border border-slate-500 p-2 text-sm text-black outline-none"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && <span className="text-red-500">Passwords do not match</span>}
              </div>

              <div className="flex w-full justify-between py-3">
                <button type="submit" className="mb-2 mt-2 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-400 ">
                  {isSubmitting ? <>Updating...</> : <>Update Password</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
