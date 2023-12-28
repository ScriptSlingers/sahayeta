'use client'
import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type loggedInUser = {
  id: string
  name: string
  orgName: string
  profileImage: string
}

export default function CreateCampaign() {
  const router = useRouter()
  const currentUser = useClientSession()

  const [file, setFile] = useState<File>()
  const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>(null)

  const [categories, setCategories] = useState([])

  const [selectedImage, setSelectedImage] = useState('')
  const [campaignNameLabel, setCampaignNameLabel] = useState('Campaign Name')
  const [campaignCategoryLabel, setCampaignCategoryLabel] =
    useState('Campaign Category')
  const [campaignDetailLabel, setCampaignDetailLabel] =
    useState('Campaign Detail')
  const [campaignGoalAmountLabel, setCampaignGoalAmountLabel] =
    useState('Goal Amount')

  if (currentUser?.id === null) {
    router.push('/login')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${currentUser.id}`)
        const res = response.data
        setLoggedInUser(res)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchData()
  }, [currentUser?.id])

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      isVerified: false,
      image: '',
      goalAmount: '',
      description: '',
      categoryId: ''
    }
  })

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  async function onSubmit(values) {
    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })

      if (!res.ok) {
        throw new Error(await res.json())
      }
      const resData = await res.json()

      values.image = resData.path
      await axios.post(
        '/api/campaigns',
        {
          ...values,
          createdById: currentUser?.id,

        },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      reset();
      toast.success('Campaign created successfully !')
    } catch (error) {
      console.error(error)
      toast.error('Error in creating the campaign')
      return error
    }
  }

  const handleImageUpload = (e: any) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  }
  const handleTitleChange = e => {
    setCampaignNameLabel(e.target.value)
  }
  const handleGoalAmountChange = e => {
    setCampaignGoalAmountLabel(e.target.value)
  }

  const handleCategoryInputChange = categoryId => {
    const selectedCategory = categories.find(
      category => category.id === categoryId
    )
    setCampaignCategoryLabel(selectedCategory.name)
  }

  const handleDetailChange = e => {
    setCampaignDetailLabel(e.target.value)
  }

  useEffect(() => {
    axios
      .get(`/api/category`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        setCategories(response.data.category)
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
      })
  }, [])
  return (
    <div className="flex flex-col gap-5 pt-10">
      <div className=" container flex flex-col justify-center items-center w-full gap-10">
        <div className="flex flex-col justify-between w-full  lg:flex-row lg:justify-between  lg:px-32">
          <div className="flex flex-col justify-center items-start gap-3 mb-20 ">
            <div className="object-cover w-32 h-32 rounded overflow-hidden">
              <Image
                src={loggedInUser?.profileImage || ""}
                width={200}
                height={200}
                alt={loggedInUser?.name}
                quality={100}
              />
            </div>
            <div>
              <div className="flex gap-3">
                <div className="text-base font-semibold">
                  Full Name:
                </div>
                <div className="text-base font-normal">
                  {loggedInUser?.orgName || loggedInUser?.name}
                </div>
              </div>
              <div className="flex gap-1">
                <div className="text-base font-normal">Verified by</div>
                <div className="w-[100px] h-[21px] relative">
                  <Image
                    src="/assets/img/logo.png"
                    alt="Logo Sahayata"
                    width={200}
                    height={200}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div>
                <div className="  bg-[#ECEEFF] h-7 flex justify-center items-center mt-3 text-base font-semibold font-poppins ">
                  Total Created Campaigns(5)
                </div>
                <div className="flex justify-center gap-3 py-3">
                  <div className="  bg-[#ECEEFF] w-44 h-7 flex justify-center items-center text-base font-normal font-poppins ">
                    Approved:(4)
                  </div>
                  <div className="  bg-[#ECEEFF] text-red-600 w-44 h-7 flex justify-center items-center text-base font-normal  font-poppins ">
                    Blocked: (1)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center justify-center ">
            <div className=" flex flex-col shadow-sm rounded-2xl lg:w-[403px] w-full  bg-[#FAFAFE] p-3">
              <div className="flex items-center justify-center pt-3">
                {file ? (
                  <div className='w-80 object-contain'>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt='Selected'
                      layout='responsive'
                      width={300}
                      height={200}
                      className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
                    />
                  </div>
                ) :
                  <div className='w-72 object-contain'>
                    <Image
                      src="/assets/img/placeholder.png"
                      alt='Selected'
                      layout='responsive'
                      width={300}
                      height={200}
                      className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
                    />
                  </div>
                }
              </div>
              <div className="flex flex-col p-3">
                <span className="text-base font-semibold font-poppins">
                  Title: {campaignNameLabel}
                </span>
                <span className="text-[#2540C4] text-xs font-normal">
                  Category: {campaignCategoryLabel}
                </span>
                <span className=" text-xs font-normal">
                  Details: {campaignDetailLabel}
                </span>
                <span className=" text-xs font-normal">
                  Amount: NPR. {campaignGoalAmountLabel}
                </span>
              </div>

              <div className="flex flex-col p-1 ">
                <div className="flex justify-between  ">
                  <div className="flex gap-2">
                    <Image
                      src={
                        loggedInUser?.profileImage || ""
                      }
                      width={200}
                      height={200}
                      alt="doc image"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">
                        {' '}
                        Created by {loggedInUser?.name}
                      </div>
                      <div className="text-xs">{formattedDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-xs text-grey-100 ">Preview</span>
          </div>
        </div>
      </div>
      <hr className="border-b border-solid border-black" />
      <span className="flex justify-center items-center text-4xl font-semibold  mt-30 px-20 text-blue-600">
        Create New Campaign
      </span>

      <form
        className="container flex flex-col justify-center items-center w-full gap-10 py-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between w-full flex-col md:flex-row gap-2 ">
          <div className="flex w-full  flex-col gap-3">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">
                Title
                <span className="text-red-500"> *</span>
              </span>
              <input
                type="text"
                required
                placeholder="Enter the  Campaign title here"
                {...register('title')}
                onChange={handleTitleChange}
                className="w-full border-b-[1.5px] border-gray-400 focus:outline-none text-base font-medium  "
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">
                Campaign Category <span className="text-red-500"> *</span>
              </span>

              <div className="flex ">
                <select
                  {...register('categoryId', { required: true })}
                  required
                  onChange={e => handleCategoryInputChange(e.target.value)}
                  defaultValue={'Select'}
                  className="w-44 py-2 px-3 rounded outline-none border-1 border-gray-400"
                >
                  <option value="" disabled >
                    Select a Category
                  </option>
                  {categories?.map(category => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">
                Campaign Description <span className="text-red-500"> *</span>
              </span>
              <textarea
                required
                placeholder="Enter the  Campaign description here"
                {...register('description')}
                onChange={handleDetailChange}
                className="w-full border-[1.5px] h-32 border-gray-400 focus:outline-none rounded p-2.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">
                GoalAmount
                <span className="text-red-500"> *</span>
              </span>
              <input
                type="number"
                required
                placeholder="Enter the  Goal Amount here"
                {...register('goalAmount')}
                onChange={handleGoalAmountChange}
                className="w-full border-b-[1.5px] border-gray-400 focus:outline-none text-base font-medium  "
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            <div className="flex flex-col justify-center w-full items-center gap-10">
              <input type='file' name="file" accept='image/*' id='imageUpload' required onChange={handleImageUpload} className='hidden' />
              {file ? (
                <div className='w-72 object-contain'>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt='Selected'
                    layout='responsive'
                    width={300}
                    height={200}
                    className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
                  />
                </div>
              ) :
                <div className='w-72 object-contain'>
                  <Image
                    src="/assets/img/placeholder.png"
                    alt='Selected'
                    layout='responsive'
                    width={300}
                    height={200}
                    className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
                  />
                </div>
              }
              <label htmlFor='imageUpload' className=' w-[126px] h-[37px] rounded-3xl flex justify-center items-cente  cursor-pointer bg-black text-white  py-2 px-4'>
                Upload
              </label>
              <p className="pt-2 text-sm">Only JPG, PNG images </p>
            </div>
          </div>
        </div>

        <div className="flex gap-20">
          <button
            type="submit"
            className="w-[126px] h-[37px] rounded-3xl bg-[#1560DB] text-white flex justify-center items-center"
          >
            {isSubmitting ? <>Creating...</> : <>Create</>}
          </button>
          <button className="w-[126px] h-[37px] rounded-3xl bg-red-600 text-white flex justify-center items-center">
            Cancel
          </button>
        </div>
      </form>
    </div >
  )
}
