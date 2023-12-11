'use client'
import React, {ChangeEvent, useState} from 'react';


export default function Profile() {

   const [selectedFile, setSelectedFile] = useState <File | null>(null);

  const handleFileChange = (e : ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
    } else {
      console.log("No file selected!");
    }
  };
  
  return (
    <>
      <div className='bg-white'>
       <h1 className='text-3xl font-maven font-semibold  py-2 text-center'>Edit Profile</h1>
        <div className='grid items-center justify-center '>
          <div className='grid items-center justify-start w-full '>
          <div className='border-2 border-slate-500 w-[153px] h-[153px] rounded-full bg-slate-300 m-2' >
          {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className='w-[150px] h-[150px] rounded-full'
          />
      )}
      </div>
      <input type="file" onChange={handleFileChange}  className='m-5'/>
      
   </div>
      
       <div className="w-full  rounded-lg mb-2 text-left p-5 shadow-md">
        <form action="#" className='flex flex-col'>
         <div className='flex items-stretch gap-3 mt-2'>
            <div className="flex-1  py-2 ">
            <p>Full Name*</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                   type="text"
                   id='text'
                   required />
            </div>
            <div className="flex-1  py-2 ">
            <p>Last Name*</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                   type="text"
                   id='text'
                   required />
            </div>
         </div>
          <div className='mt-2'>
          <p>Email*</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
        type="text"
        id='text'
        required />
          </div>
          <div className='mt-2'>
          <p>Contact*</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
        type="text"
        id='text'
        required />
          </div>
          <div className='mt-2'>
          <p>Address*</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
        type="text"
        id='text'
        required />
          </div>
          <div className='flex items-stretch gap-3 mt-2'>
            <div className="flex-1  py-2 ">
            <p>City</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                   type="text"
                   id='text'
                   required />
            </div>
            <div className="flex-1  py-2 ">
            <p>State/Province</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                   type="text"
                   id='text'
                   required />
            </div>
         </div>
         <div className='flex items-stretch gap-3 mt-2'>
            <div className="flex-1  py-2 ">
            <p>Zip Code</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                   type="text"
                   id='text'
                   required />
            </div>
            <div className="flex-1  py-2 ">
            <p>Country</p>
            <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                   type="text"
                   id='text'
                   required />
            </div>
         </div>
        <button onClick={handleUpload} className="w-full bg-blue-800 text-white p-2 rounded-lg mb-4 mt-5 hover:bg-blue-500 ">
              Update Information
        </button>
        </form>
        </div>
        </div>  
       </div>
   
    </>
  )
}

