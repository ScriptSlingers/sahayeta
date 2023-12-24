import { useState } from "react";
import { AuthAPI } from "../../src/api";

export const useUserHospitals = () => {

    const [data, setData] = useState([])
    AuthAPI
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/hospital/`)
        .then((res) => {
            setData(res.data)
        })
        .catch((error) => {
            console.log("error:", error)
        });

    return data
}