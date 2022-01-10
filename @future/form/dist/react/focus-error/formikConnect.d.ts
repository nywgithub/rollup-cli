import { ComponentType } from "react";
export declare function formikConnect<C extends ComponentType<{
    formik: any;
}>>(component: C): ComponentType<Omit<GetProps<C>, "formik">>;
declare type GetProps<T> = T extends ComponentType<infer P> ? P : never;
export {};
