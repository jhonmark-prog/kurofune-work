import { DATE_FORMAT } from "@/components";
import { GENDER, User } from "@/store/userSlice";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const BASE_URL = 'ab8c-139-135-77-110.ngrok-free.app';

interface UserRegistrationData {
    error: string | null,
    data: {email: string} | null
}

interface UserLoginData {
    error: string | null,
    user: User | null
}

interface UserLoginProps {
    email?: string,
    password?: string
}

const formatParamsForUserRegistration = (userInfo: User) => {
    const userRegistrationParams = {
        email: userInfo.email,
        password: userInfo.password,
        first_name: userInfo.fullName,
        gender: userInfo.gender == GENDER.MALE ? 0 : 1,
        dob: userInfo.birthday ? dayjs(userInfo.birthday,DATE_FORMAT).format('YYYY-MM-DD') : undefined,
        nationality: userInfo.nationality,
        username: userInfo.fullName?.toLowerCase(), //api needs to remove this requirement
        last_name: 'test' //api needs to remove this requirement
    }
    return userRegistrationParams;
}

const formatReturnedUserData = (returnData: any): User => {
    const user = returnData.user;
    const profile = user && user.profile ? user.profile : null;

    const userInfo: User = {
        accessToken: returnData.access_token || '',
        active: user && user.active ?  user.active == 1 ? true : false : undefined,
        id: user && user.id ? user.id : undefined,
        email: user && user.email ? user.email : '',
        fullName: user && user.first_name ? user.first_name : '',
        emailVerified: user && user.email_verified_at ? true : false,
        gender: profile && profile.gender ? profile.gender : '',
        birthday: profile && profile.dob ? profile.dob : undefined,
        nationality: profile && profile.nationality ? profile.nationality : '',
    }
    return userInfo;
}

export const registerUser = async (userInfo: User): Promise<UserRegistrationData> => {
    const userRegistrationEndpoint = `https://${BASE_URL}/api/v1/signup`;
    const returnData: UserRegistrationData = { error: null, data: null }

    try {
        const response = await fetch(userRegistrationEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formatParamsForUserRegistration(userInfo))
        });

        if (!response.ok) {
            throw new Error(`request failed: ${response.status}`);
        }

        const result = await response.json();

        if(result.data){
            returnData.data = {email: result.data.email || ''};
        }
    } catch (error: unknown) {
        if (error instanceof Error)
            returnData.error = error.message;
        else if (typeof error === 'string')
            returnData.error = error;
        else
            returnData.error = 'unknown error occurred.';

        returnData.data = null
    }

    return returnData;
}

export const loginUser = async (userInfo: UserLoginProps): Promise<UserLoginData> => {
    const userLoginEndpoint = `https://${BASE_URL}/api/v1/login`;
    const returnData: UserLoginData = { error: null, user: null }

    try {
        const response = await fetch(userLoginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userInfo)
        });

        if (!response.ok) {
            throw new Error(`request failed: ${response.status}`);
        }

        const result = await response.json();

        returnData.user = formatReturnedUserData(result.data);
    } catch (error: unknown) {
        if (error instanceof Error)
            returnData.error = error.message;
        else if (typeof error === 'string')
            returnData.error = error;
        else
            returnData.error = 'unknown error occurred.';

        returnData.user = null
    }

    return returnData;
}
