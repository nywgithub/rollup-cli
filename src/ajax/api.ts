import { engine, verifyEngine } from "./base";

export const accessVip = (venueId: string, data: string & { password: string }) => {
    return engine.post(`/venue/applyVenue/${ venueId }`, {
        data,
        withCredentials: true
    });
};

export const verifyPhone = (venueId: string, phone: string) => {
    return verifyEngine.get("/venue/apply/verifyEmailPhone", {
        params: {
            type: "phone",
            venueId,
            value: phone,
            _: new Date().getTime()
        }
    })
};