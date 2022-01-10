import "../css/hover-title.scss";
import React from "react";
import { PopoverProps } from "@future/popover/dist/react";
export interface HoverTitleProps extends PopoverProps {
    className?: string;
    content: string;
    offset?: [number, number];
}
export declare const HoverTitle: React.FC<HoverTitleProps>;
