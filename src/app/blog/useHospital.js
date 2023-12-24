import { AuthAPI } from "../../src/api";

export const useHospital = (userId) => {
    AuthAPI
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/hospital/${userId ?? ''}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return ({ error: error })
        });
}