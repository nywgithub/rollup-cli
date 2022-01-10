import "./css/index.scss";
import { Props } from "tippy.js";
export interface TooltipProps extends Partial<Omit<Props, "theme">> {
    className?: string;
    theme?: "light" | "dark";
}
export declare const tooltip: (el: Element, props: TooltipProps) => import("tippy.js").Instance<Props>;
export interface HoverTitleProps {
    className?: string;
    content: string;
    offset?: [number, number];
}
export declare const hoverTitle: (el: Element, props: HoverTitleProps) => import("tippy.js").Instance<Props>;
