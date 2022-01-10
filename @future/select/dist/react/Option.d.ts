import React, { MouseEvent, ReactNode } from "react";
export interface OptionProps {
    className?: string;
    optClassName?: string;
    value: string;
    title?: string;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
    prefix?: ReactNode;
    onSelect?: (value: string) => void;
}
export declare class Option extends React.Component<OptionProps> {
    constructor(props: any);
    handleSelect(): void;
    handleClick(e: MouseEvent<HTMLAnchorElement>): void;
    render(): React.ReactNode;
    componentDidUpdate(prevProps: Readonly<OptionProps>, prevState: Readonly<{}>, snapshot?: any): void;
    componentDidMount(): void;
}
