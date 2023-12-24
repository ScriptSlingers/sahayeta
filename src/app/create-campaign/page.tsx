import { CreateNewCampaign } from "@sahayeta/components/CreateNewCampaign";


export default function CreateBlog() {
    return (
        <>
            <div className="bg-slate-100 flex flex-col justify-center items-center ">
                <div className="w-[95%] flex flex-col  gap-6 bg-white">
                    <div className="bg-[#546DEA] flex justify-center items-center h-14 text-white font-poppins font-semibold text-xl">
                        Create New campaign
                    </div>
                    <CreateNewCampaign />
                </div>
            </div>
        </>
    )
}
