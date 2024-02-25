'use client'
import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"
import 'leaflet/dist/leaflet.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

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
  const [campaignStartDateLabel, setcampaignStartDateLabel] =
    useState('startDate')
  const [campaignEndDateLabel, setCampaignEndDateLabel] = useState('endDate')


  const center = {
    lat: 27.6706,
    lng: 84.4385,
  }

  const [latitude, setLatitude] = useState(center.lat);
  const [longitude, setLongitude] = useState(center.lng);
  const [address, setAddress] = useState("");



  if (currentUser?.id === null) {
    router.push('/login')
  }

  const LocationMarker = () => {
    const eventHandlers = useMemo(() => ({
      dragend(event) {
        const newPos = event.target.getLatLng();
        setLatitude(newPos.lat);
        setLongitude(newPos.lng);
        getAddressFromCoordinates(newPos.lat, newPos.lng);
      },
    }), []);

    const getAddressFromCoordinates = async (lat, lng) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        setAddress(data.display_name);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={{ lat: latitude, lng: longitude }}>
        <Popup minWidth={90}>
          <span>
            {address}
          </span>
        </Popup>
      </Marker>
    );

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
      categoryId: '',
      startDate: '',
      endDate: '',
    }
  })

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const setNewDate = input => new Date(input.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1')).toISOString();



  async function onSubmit(values, e) {
    e.preventDefault();
    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to upload file');
      }

      const resData = await res.json()

      values.image = resData.path;
      values.latitude = JSON.stringify(latitude);
      values.longitude = JSON.stringify(longitude);
      values.address = address;
      values.createdById = currentUser.id;
      values.startDate = setNewDate(values.startDate)
      values.endDate = setNewDate(values.endDate)
      await axios.post(
        '/api/campaigns',
        {
          ...values,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      reset()
      toast.success('Campaign created successfully !')
    } catch (error) {
      console.error(error)
      console.log(values)
      toast.error('Error in creating the campaign: ' + error.message)
      return error
    }
  }


  const handleImageUpload = (e: any) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
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

  const handleStartDateChange = e => {
    setcampaignStartDateLabel(e.target.value)
  }
  const handleEndDateChange = e => {
    setCampaignDetailLabel(e.target.value)
  }
  const handleDetailChange = e => {
    setCampaignEndDateLabel(e.target.value)
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
      <div className=" container flex w-full flex-col items-center justify-center gap-10">
        <div className="flex w-full flex-col justify-between  lg:flex-row lg:justify-between  lg:px-32">
          <div className="mb-20 flex flex-col items-start justify-center gap-3 ">
            <div className="h-32 w-32 overflow-hidden rounded object-cover">
              <Image
                src={loggedInUser?.profileImage || ''}
                width={200}
                height={200}
                alt={loggedInUser?.name}
                quality={100}
              />
            </div>
            <div>
              <div className="flex gap-3">
                <div className="text-base font-semibold">Full Name:</div>
                <div className="text-base font-normal">
                  {loggedInUser?.orgName || loggedInUser?.name}
                </div>
              </div>
              <div className="flex gap-1">
                <div className="text-base font-normal">Verified by</div>
                <div className="relative h-[21px] w-[100px]">
                  <Image
                    src="/assets/img/logo.png"
                    alt="Logo Sahayata"
                    width={200}
                    height={200}
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div>
                <div className="  font-poppins mt-3 flex h-7 items-center justify-center bg-[#ECEEFF] text-base font-semibold ">
                  Total Created Campaigns(5)
                </div>
                <div className="flex justify-center gap-3 py-3">
                  <div className="  font-poppins flex h-7 items-center justify-center bg-[#ECEEFF] text-base font-normal px-2 ">
                    Approved:(4)
                  </div>
                  <div className="  font-poppins flex h-7 items-center justify-center bg-[#ECEEFF] text-base font-normal px-2 text-blue-600 ">
                    Pending Approval: (1)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 ">
            <div className=" flex w-full flex-col rounded-2xl bg-[#FAFAFE] p-3  shadow-sm lg:w-[403px]">
              <div className="flex items-center justify-center pt-3">
                {file ? (
                  <div className="w-80 object-contain">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Selected"
                      layout="responsive"
                      width={300}
                      height={200}
                      className=" flex items-center justify-center rounded-2xl  bg-slate-400 p-1"
                    />
                  </div>
                ) : (
                  <div className="w-72 object-contain">
                    <Image
                      src="/assets/img/placeholder.png"
                      alt="Selected"
                      layout="responsive"
                      width={300}
                      height={200}
                      className=" flex items-center justify-center rounded-2xl  bg-slate-400 p-1"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col p-3">
                <span className="font-poppins text-base font-semibold">
                  Title: {campaignNameLabel}
                </span>
                <span className="text-xs font-normal text-[#2540C4]">
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
                      src={loggedInUser?.profileImage || ''}
                      width={200}
                      height={200}
                      alt="doc image"
                      className="h-8 w-8 rounded-full"
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
            <span className="text-grey-100 text-xs ">Preview</span>
          </div>
        </div>
      </div>
      <hr className="border-b border-solid border-black" />
      <span className="mt-30 flex items-center justify-center px-20  text-4xl font-semibold text-blue-600">
        Create New Campaign
      </span>

      <form
        className="container flex w-full flex-col items-center justify-center gap-10 py-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col justify-between gap-2 md:flex-row ">
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
                className="w-full border-b-[1.5px] border-gray-400 text-base font-medium focus:outline-none  "
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
                  className="w-56 rounded border-1 border-gray-400 px-3 py-2 outline-none"
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  {categories?.map(category => (
                    <option value={category.id} key={category.id}>
                      {category.displayName}
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
                className="h-32 w-full rounded border-[1.5px] border-gray-400 p-2.5 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">
                Location
                <span className="text-red-500"> *</span>
              </span>
              <input
                type="text"
                required
                placeholder="Enter the  Campaign title here"
                className="w-full border-b-[1.5px] border-gray-400 text-base font-medium focus:outline-none  "
                defaultValue={address}
                disabled
              />
              <MapContainer center={center} zoom={13} className='h-80'>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
              </MapContainer>
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
                className="w-1/2 border-b-[1.5px] border-gray-400 text-base font-medium focus:outline-none  "
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500">
                StartDate
                <span className="text-red-500"> *</span>
              </span>
              <input
                type="date"
                required
                placeholder="Enter the  Start Date  here"
                {...register('startDate')}
                onChange={handleStartDateChange}
                className="w-1/2 border-b-[1.5px] border-gray-400 focus:outline-none text-base font-medium  "
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">
                EndDate
                <span className="text-red-500"> *</span>
              </span>
              <input
                type="date"
                required
                placeholder="Enter the  End Date here"
                {...register('endDate')}
                onChange={handleEndDateChange}
                className="w-1/2 border-b-[1.5px] border-gray-400 focus:outline-none text-base font-medium  "
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-start md:w-1/2">
            <div className="flex w-full flex-col items-center justify-center gap-10">
              <input
                type="file"
                name="file"
                accept="image/*"
                id="imageUpload"
                required
                onChange={handleImageUpload}
                className="hidden"
              />
              {file ? (
                <div className="w-72 object-contain">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Selected"
                    layout="responsive"
                    width={300}
                    height={200}
                    className=" flex items-center justify-center rounded-2xl  bg-slate-400 p-1"
                  />
                </div>
              ) : (
                <div className="w-72 object-contain">
                  <Image
                    src="/assets/img/placeholder.png"
                    alt="Selected"
                    layout="responsive"
                    width={300}
                    height={200}
                    className=" flex items-center justify-center rounded-2xl  bg-slate-400 p-1"
                  />
                </div>
              )}
              <label
                htmlFor="imageUpload"
                className=" items-center flex h-[37px] w-[126px] cursor-pointer justify-center  rounded-3xl bg-black px-4  py-2 text-white"
              >
                Upload
              </label>
              <p className="pt-2 text-sm">Only JPG, PNG images </p>
            </div>
          </div>
        </div>

        <div className="flex gap-20">
          <button
            type="submit"
            className="flex h-[37px] w-[126px] items-center justify-center rounded-3xl bg-[#1560DB] text-white"
          >
            {isSubmitting ? <>Creating...</> : <>Create</>}
          </button>
          <button className="flex h-[37px] w-[126px] items-center justify-center rounded-3xl bg-red-600 text-white">
            Cancel
          </button>
        </div>
      </form >
    </div >
  )
}
