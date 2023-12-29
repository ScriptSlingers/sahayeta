// import axios from "axios";
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from "react";


// const PopUpForEdit = ({ onClose, blogId }) => {
//     const router = useRouter();
//     const [blogs, setBlogs] = useState([]);
//     const [selectedImagePopup, setSelectedImagePopup] = useState(null);
//     const [categoryInputVisible, setCategoryInputVisible] = useState(false);
//     const [selectedEditedCategory, setSelectedEditedCategory] = useState('');
//     const [newEditedCategory, setNewEditedCategory] = useState('');
//     const [editedTitle, setEditedTitle] = useState('');
//     const [editedDetail, setEditedDetail] = useState('');
//     const [blogData, setBlogData] = useState([]);

//     const handleImageUploadPopup = (e) => {
//         const imageFile = e.target.files[0];
//         if (imageFile) {
//             setSelectedImagePopup(imageFile);
//         }
//     };

//     useEffect(() => {
//         axios
//             .get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`)
//             .then((res) => setBlogs(res.data))
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, []);

//     const categories = [...new Set(blogs.map((item) => item.category))];

    

//     const handleCategoryChange = (e) => {
//         const selectedValue = e.target.value;
//         if (selectedValue === 'addNew') {
//             setCategoryInputVisible(true);
//             setSelectedEditedCategory('');
//         } else {
//             setCategoryInputVisible(false);
//             setSelectedEditedCategory(selectedValue);
//         }
//     };

//     const postData = async (e) => {
//         e.preventDefault();
//         if (!selectedImagePopup) {
//             Notify("error", "Image is required");
//             return;
//         }
//         const editedImageUrl = URL.createObjectURL(selectedImagePopup);
//         const requestBody = {
//             category: selectedEditedCategory || newEditedCategory,
//             title: editedTitle,
//             detail: editedDetail,
//             image: editedImageUrl,
//         };
//         try {
//             AuthAPI.put(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogId}`, requestBody);
//             Notify("success", 'Blog updated sucessfully');

//             router.reload();
//         } catch (error) {
//             Notify("error", 'Error updating blog');
//         }
//     };

//     return (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full container flex-col justify-center items-center bg-white shadow-2xl rounded p-4">
//             <form className='container flex flex-col justify-center items-center w-full gap-10' onSubmit={(e) => postData(e)}>
//                 <div className='flex justify-between w-full '>
//                     <div className='flex w-1/2 flex-col gap-3'>
//                         <div className='flex flex-col gap-2'>
//                             <span className='text-gray-500'>
//                                 Blog Title <span className='text-red-500'> *</span>
//                             </span>
//                             <input
//                                 type='text'
//                                 name='editedTitle'
//                                 value={editedTitle}
//                                 placeholder='Enter the blog title here'
//                                 className='w-1/2 border-b-[1.5px] border-gray-400 focus:outline-none text-base font-medium  '
//                                 onChange={(e) => setEditedTitle(e.target.value)}
//                             />
//                         </div>
//                         <div className='flex flex-col gap-2'>
//                             <span className='text-gray-500'>
//                                 Blog Categories <span className='text-red-500'> *</span>
//                             </span>
//                             <select
//                                 name='editedCategory'
//                                 className='rounded focus:outline-none border-gray-400 text-gray-600 w-48 p-1'
//                                 onChange={handleCategoryChange}
//                                 value={selectedEditedCategory || newEditedCategory}>
//                                 <option value='' disabled>
//                                     {blogData.category || 'Select'} </option>
//                                 {categories?.map((item) => (
//                                     <option value={item} key={item}>
//                                         {item}
//                                     </option>
//                                 ))}
//                                 <option value='addNew'>Add New Category</option>
//                             </select>
//                             {categoryInputVisible && (
//                                 <input
//                                     type='text'
//                                     placeholder='Enter new category'
//                                     value={newEditedCategory}
//                                     onChange={(e) => setNewEditedCategory(e.target.value)}
//                                     className='w-full border-[1.5px] border-gray-400 focus:outline-none rounded p-2.5 mt-2'
//                                 />
//                             )}
//                         </div>
//                         <div className='flex flex-col gap-2'>
//                             <span className='text-gray-500'>
//                                 Blog Description <span className='text-red-500'> *</span>
//                             </span>
//                             <textarea name='editedDetail' value={editedDetail} placeholder='Enter the Blog description here' className='w-full border-[1.5px] h-32 border-gray-400 focus:outline-none rounded-2xl p-2.5' onChange={(e) => setEditedDetail(e.target.value)} />
//                         </div>
//                     </div>
//                     <div className='w-1/2 flex flex-col justify-start'>
//                         <div className='flex flex-col  justify-center w-full items-center'>
//                             <input type='file' accept='image/*' id='imageUploadPopup' onChange={handleImageUploadPopup} className='hidden' />
//                             {selectedImagePopup && (
//                                 <div className='h-52 w-72 object-cover'>
//                                     <Image
//                                         src={URL.createObjectURL(selectedImagePopup)}
//                                         alt='Selected'
//                                         layout='responsive'
//                                         width={300}
//                                         height={200}
//                                         className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
//                                     />
//                                 </div>
//                             )}
//                             <label htmlFor='imageUploadPopup' className=' w-[126px] h-[37px] rounded-3xl flex justify-center items-cente  cursor-pointer bg-black text-white  py-2 px-4'>
//                                 Upload
//                             </label>
//                             <p className='pt-2 text-sm'>Only JPG, PNG images </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='flex gap-20'>
//                     <button
//                         className="w-[80px] h-[37px] rounded-3xl bg-black text-white flex justify-center items-center gap-1"
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button type='submit' className='w-[126px] h-[37px] rounded-3xl bg-[#1560DB] text-white flex justify-center items-center' >
//                         Update
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default function PopUpEdit({ blogId }) {
//     const [isPopUpOpen, setIsPopUpOpen] = useState(false);

//     const handleEditClick = () => {
//         setIsPopUpOpen(true);
//     };

//     const handleClosePopUp = () => {
//         setIsPopUpOpen(false);
//     };

//     return (
//         <div>
//             {isPopUpOpen && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
//             )}
//             <button
//                 className="w-[80px] h-[37px] rounded-3xl bg-[#1560DB] text-white flex justify-center items-center gap-1 p-2"
//                 onClick={handleEditClick}
//             >
//                 <span>Edit</span>
//                 <img src="/img/editicon.svg" alt="CMC" />
//             </button>
//             {isPopUpOpen && <PopUpForEdit onClose={handleClosePopUp} blogId={blogId} />}
//         </div>
//     );
// }
