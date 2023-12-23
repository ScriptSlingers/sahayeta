import UserTable from '@sahayeta/components/UserTable'
import {
    BsBarChart,
    BsDownload,
    BsHouseExclamation,
    BsPieChart
} from 'react-icons/bs'

export default function test() {

    return (
        <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
            <div className="container " >
                <div className="bg-white w-full h-16 flex gap-8 px-32 items-center font-medium">
                    <p>Demo</p>
                    <p>Demo</p>
                    <p>Demo</p>
                    <p>Demo</p>
                    <p>Demo</p>
                    <p>Demo</p>
                </div>
                <div className='flex'>
                    <div className="bg-white w-20   flex flex-col gap-5 items-center justify-center py-16">
                        <BsHouseExclamation className="text-2xl" />
                        <BsDownload className="text-2xl" />
                        <BsPieChart className="text-2xl" />
                        <BsBarChart className="text-2xl" />
                        <BsHouseExclamation className="text-2xl" />
                        <BsDownload className="text-2xl" />
                        <BsPieChart className="text-2xl" />
                        <BsBarChart className="text-2xl" />
                        <BsHouseExclamation className="text-2xl" />
                        <BsDownload className="text-2xl" />
                        <BsPieChart className="text-2xl" />
                        <BsBarChart className="text-2xl" />
                    </div>
                    <div className="bg-slate-200 flex flex-col w-full  ">
                        <p className="text-lg font-bold p-12">Users List</p>
                        <UserTable />
                    </div>
                </div>
            </div>
        </div >
    )
}
