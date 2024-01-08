"use client"
import { useClientSession } from "@sahayeta/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type loggedInUser = {
    id: string;
    name: string;
    orgName: string;
    profileImage: string;
};

export default function UpdateUser() {
    const router = useRouter();
    const currentUser = useClientSession();
    const [file, setFile] = useState<File | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/users/${currentUser.id}`);
                const res = response.data;
                setLoggedInUser(res);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (currentUser?.id) {
            fetchData();
        }
    }, [currentUser?.id]);

    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            name: loggedInUser?.name || '', // Set default value based on fetched user data
            bio: '',
            phoneNum: '',
            dob: '',
        },
    });

    const onSubmit = async (values) => {
        try {
            if (!file) {
                throw new Error('Please upload an image.');
            }

            const data = new FormData();
            data.set('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });

            if (!res.ok) {
                throw new Error(await res.json());
            }

            const resData = await res.json();

            await axios.put(
                `/api/users/${currentUser.id}`, // Use PUT method for updating user data
                {
                    ...values, // Include other form values

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json',
                    },
                }
            );

            reset();
            toast.success('User update successful!');
        } catch (error) {
            console.error(error);
            toast.error('Error in updating users');
        }
    };

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <div>
            <h1>Update User Information</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name:</label>
                <input
                    type="text"
                    {...register('name')} // Use react-hook-form register to bind input with form state
                    onChange={(e) => setValue('name', e.target.value)}
                />
                {/* Add other form fields for updating user information */}
                <input type="file" onChange={handleImageUpload} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
