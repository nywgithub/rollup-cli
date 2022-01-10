import "../css/index.scss";
import React from "react";
import { PopoverProps } from "@future/popover/dist/react";
export interface TooltipProps extends PopoverProps {
    content?: string;
    theme?: "light" | "dark";
}
export declare const Tooltip: React.FC<TooltipProps>;
