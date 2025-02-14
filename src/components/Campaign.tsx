'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
export default function Campaign() {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCategories, setFilteredCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/category')
        const data = await response.json()

        const categoryNames = data.category.map(category => category.name)

        setCategories(categoryNames)
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSearch = value => {
    setSearchTerm(value)

    // Filter categories based on the search term
    const filtered = categories.filter(category =>
      category.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredCategories(filtered)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/category')
        const data = await response.json()

        const categoryNames = data.category.map(category => category.name)

        setCategories(categoryNames)
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div className="flex flex-row gap-8 p-4 ">
        <div className="ml-20 mt-28  flex h-1/2 w-1/6 flex-col rounded-lg bg-neutral-100 pb-14 ">
          <div className="ml-8  mt-10 justify-center space-y-12 text-xl font-semibold text-gray-500">
            <h1 className="text-2xl font-semibold ">Categories</h1>
            <div className="gap-20">
              <option value="all categories" className="hover:text-blue-500 ">
                All Categories
              </option>
              <option value="education" className="hover:text-blue-500 ">
                Education
              </option>
              <option value="medical" className="hover:text-blue-500 ">
                Medical
              </option>
              <option value="children" className="hover:text-blue-500 ">
                Children
              </option>
              <option value="memorial" className="hover:text-blue-500 ">
                Memorial
              </option>
              <option value="animals" className="hover:text-blue-500 ">
                Animals
              </option>
              <option value="food&hunger" className="hover:text-blue-500 ">
                Food & Hunger
              </option>
              {categories.map(category => (
                <option
                  value={category}
                  key={category}
                  className="flex items-center  justify-center gap-3 text-base"
                >
                  {category}
                </option>
              ))}
            </div>
            <div className="relative w-full">
              <div className="">
                {filteredCategories.length > 0 &&
                  filteredCategories.map(category => (
                    <div
                      key={category}
                      onClick={() => {
                        console.log(`Selected category: ${category}`)
                      }}
                    >
                      {category}
                    </div>
                  ))}
              </div>
            </div>
            <button className="flex h-10 w-2/3 justify-center rounded border border-blue-500 bg-blue-500 py-1 text-white duration-300 hover:border-blue-500 hover:bg-transparent hover:text-blue-500  ">
              Start a fundraiser
            </button>
          </div>
        </div>
        <div className="">
          <h1 className="ml-8 mt-10 justify-center text-2xl font-semibold text-gray-500 ">
            Showing Fundraiser For :
          </h1>
          <div className="flex flex-row gap-8 ">
            <div className=" ml-8 mt-10 flex h-2/3  w-2/5 flex-col rounded-lg bg-neutral-200">
              <div className="">
                <Image
                  src="/assets/img/donation.jpg"
                  alt="Hero Section"
                  width={400}
                  height={100}
                  className="rounded-t-lg"
                  quality={100}
                />
                <div className="m-2 ml-5 space-y-3 pt-2 ">
                  <p className="text-heading6 font-semibold text-black">
                    Help This Child Get A Second Chance At Life.
                  </p>
                  <h1 className="text-2xl font-semibold text-black">$ 1500</h1>
                  <p className="font-semibold text-gray-500">
                    raised of $ 10,000 goal
                  </p>
                  <progress
                    value={100}
                    className="h-2.5 w-80 rounded-lg bg-blue-500"
                  ></progress>
                  <div className="flex flex-row gap-36 pb-4 font-semibold text-gray-500">
                    <p>10 days left</p>
                    <p>10 supporters</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ml-8 mt-10 flex h-2/3  w-2/5 flex-col rounded-lg bg-neutral-200">
              <div className="">
                <Image
                  src="/assets/img/donation.jpg"
                  alt="Hero Section"
                  width={400}
                  height={100}
                  className="rounded-t-lg"
                  quality={100}
                />
                <div className="m-2 ml-5 space-y-3 pt-2 ">
                  <p className="text-heading6 font-semibold text-black">
                    Help This Child Get A Second Chance At Life.
                  </p>
                  <h1 className="text-2xl font-semibold text-black">$ 1500</h1>
                  <p className="font-semibold text-gray-500">
                    raised of $ 10,000 goal
                  </p>
                  <progress
                    value={100}
                    className="h-2.5 w-80 rounded-lg bg-blue-500"
                  ></progress>
                  <div className="flex flex-row gap-36 pb-4 font-semibold text-gray-500">
                    <p>10 days left</p>
                    <p>10 supporters</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ml-8 mt-10 flex h-2/3  w-2/5 flex-col rounded-lg bg-neutral-200">
              <div className="">
                <Image
                  src="/assets/img/donation.jpg"
                  alt="Hero Section"
                  width={400}
                  height={100}
                  className="rounded-t-lg"
                  quality={100}
                />
                <div className="m-2 ml-5 space-y-3 pt-2 ">
                  <p className="text-heading6 font-semibold text-black">
                    Help This Child Get A Second Chance At Life.
                  </p>
                  <h1 className="text-2xl font-semibold text-black">$ 1500</h1>
                  <p className="font-semibold text-gray-500">
                    raised of $ 10,000 goal
                  </p>
                  <progress
                    value={100}
                    className="h-2.5 w-80 rounded-lg bg-blue-500"
                  ></progress>
                  <div className="flex flex-row gap-36 pb-4 font-semibold text-gray-500">
                    <p>10 days left</p>
                    <p>10 supporters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8 ">
            <div className=" ml-8 mt-10 flex h-2/3  w-2/5 flex-col rounded-lg bg-neutral-200">
              <div className="">
                <Image
                  src="/assets/img/donation.jpg"
                  alt="Hero Section"
                  width={400}
                  height={100}
                  className="rounded-t-lg"
                  quality={100}
                />
                <div className="m-2 ml-5 space-y-3 pt-2 ">
                  <p className="text-heading6 font-semibold text-black">
                    Help This Child Get A Second Chance At Life.
                  </p>
                  <h1 className="text-2xl font-semibold text-black">$ 1500</h1>
                  <p className="font-semibold text-gray-500">
                    raised of $ 10,000 goal
                  </p>
                  <progress
                    value={100}
                    className="h-2.5 w-80 rounded-lg bg-blue-500"
                  ></progress>
                  <div className="flex flex-row gap-36 pb-4 font-semibold text-gray-500">
                    <p>10 days left</p>
                    <p>10 supporters</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ml-8 mt-10 flex h-2/3  w-2/5 flex-col rounded-lg bg-neutral-200">
              <div className="">
                <Image
                  src="/assets/img/donation.jpg"
                  alt="Hero Section"
                  width={400}
                  height={100}
                  className="rounded-t-lg"
                  quality={100}
                />
                <div className="m-2 ml-5 space-y-3 pt-2 ">
                  <p className="text-heading6 font-semibold text-black">
                    Help This Child Get A Second Chance At Life.
                  </p>
                  <h1 className="text-2xl font-semibold text-black">$ 1500</h1>
                  <p className="font-semibold text-gray-500">
                    raised of $ 10,000 goal
                  </p>
                  <progress
                    value={100}
                    className="h-2.5 w-80 rounded-lg bg-blue-500"
                  ></progress>
                  <div className="flex flex-row gap-36 pb-4 font-semibold text-gray-500">
                    <p>10 days left</p>
                    <p>10 supporters</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ml-8 mt-10 flex h-2/3  w-2/5 flex-col rounded-lg bg-neutral-200">
              <div className="">
                <Image
                  src="/assets/img/donation.jpg"
                  alt="Hero Section"
                  width={400}
                  height={100}
                  className="rounded-t-lg"
                  quality={100}
                />
                <div className="m-2 ml-5 space-y-3 pt-2 ">
                  <p className="text-heading6 font-semibold text-black">
                    Help This Child Get A Second Chance At Life.
                  </p>
                  <h1 className="text-2xl font-semibold text-black">$ 1500</h1>
                  <p className="font-semibold text-gray-500">
                    raised of $ 10,000 goal
                  </p>
                  <progress
                    value={100}
                    className="h-2.5 w-80 rounded-lg bg-blue-500"
                  ></progress>
                  <div className="flex flex-row gap-36 pb-4 font-semibold text-gray-500">
                    <p>10 days left</p>
                    <p>10 supporters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
