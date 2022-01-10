import React from "react";
import { SelectedData, SelectProps as ReactSelectProps } from "./react/Select";
export interface SelectProps extends Omit<ReactSelectProps, "selectedRender"> {
    selectedRender?: (options: Array<SelectedData>) => string;
    list: Array<Option | Group>;
}
declare class Select extends React.Component<SelectProps> {
    constructor(props: SelectProps);
    renderOptionGroup(group: Group): JSX.Element;
    renderOption(option: Option): JSX.Element;
    render(): JSX.Element;
}
export default Select;
export interface Option {
    className?: string;
    optClassName?: string;
    value: string;
    title?: string;
    label?: string;
    disabled?: boolean;
    children?: string;
}
export interface Group {
    label: string;
    disabled?: boolean;
    options: Option[];
}
