'use client'
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Bs1Circle } from "react-icons/bs";

const PopUp = ({ onClose, onDelete }) => {

    const handleDelete = () => {
        onDelete();
        onClose();
    };
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 flex-col justify-center items-center bg-white shadow-2xl rounded p-4">
            <div className="flex flex-col gap-3 justify-center items-center text-center">
                <p className="text-base font-medium font-poppins text-black">
                    &quot; Are you sure to Delete this user? &quot;
                </p>
                <span className="text-xs ">
                    If you delete this user it will be removed from your system
                    permanently, you can&apos;t get it back.
                </span>
                <span className="text-xs font-medium  font-poppins text-black">
                    Yes, I want to remove this user now.
                </span>
            </div>

            <div className="flex justify-between p-3">
                <button
                    className="w-[80px] h-[37px] rounded-3xl bg-black text-white flex justify-center items-center gap-1"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="w-[80px] h-[37px] rounded-3xl bg-black text-white flex justify-center items-center gap-1"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default function PopUpDelete({ id }) {
    const router = useRouter();
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsPopUpOpen(true);
    };

    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axios.post(`$http://localhost:3000/api/users${id}`);
            router.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            {isPopUpOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
            )}
            <button
                className="w-[80px] h-[37px] rounded-3xl bg-[#F87575] text-white flex justify-center items-center gap-1 p-2"
                onClick={handleDeleteClick}
            >
                <span>Delete</span>
                <Bs1Circle />
            </button>

            {isPopUpOpen && <PopUp onClose={handleClosePopUp} onDelete={handleDelete} />}
        </div>
    );
}
