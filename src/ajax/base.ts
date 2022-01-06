import AxiosWingsEngine, { AxiosRequestConfig } from "axios-wings";

interface JSONResult<T> {
    code: number;
    data: T;
    message: string;
    success: boolean
}


class BaseEngine extends AxiosWingsEngine {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    async request<T>(config: AxiosRequestConfig) {
        const jsonResult = await super.request<JSONResult<T>>(config);

        if (jsonResult.code === 200) {
            return jsonResult.data;
        } else {
            throw jsonResult;
        }

    }
}


const baseURL = ["expo.made-in-china.com", "m.made-in-china.com"].includes(location.hostname) ? "/expo" : "//expo.made-in-china.com/expo"

export const engine = new BaseEngine({ baseURL });


export enum VerifyErrorCodeEnum {
    ALREADY_ACCESS = "E01",
    BUYER_NOT_ACCESS = "E05",
    SUPPLIER = "E403"
}

export interface VerifyResult {
    errorCode: VerifyErrorCodeEnum[];
    errorMsg: string,
    success: boolean
}

class VerifyEngine extends AxiosWingsEngine {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    async get<T = VerifyResult>(url: string, config?: AxiosRequestConfig) {
        return super.get<T>(url, config);
    }
}

export const verifyEngine = new VerifyEngine({ baseURL });