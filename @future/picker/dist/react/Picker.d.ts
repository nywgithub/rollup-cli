import "../css/index.scss";
import React, { ReactChild, ReactElement, RefObject } from "react";
export declare const appendHtmlChildren: (target: ReactElement, children: string | ReactElement) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export interface PickerProps {
    namespace?: string;
    className?: string;
    value?: ReactChild;
    name?: string;
    title?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    dropdownVisible?: boolean;
    prefix?: ReactElement;
    suffix?: ReactElement;
    arrow?: boolean;
    clear?: boolean;
    onBlur?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
    onClear?: () => void;
}
interface PickerState {
    open?: boolean;
}
declare class Picker extends React.Component<PickerProps, PickerState> {
    pickerRef: RefObject<HTMLDivElement>;
    static defaultProps: {
        namespace: string;
    };
    constructor(props: PickerProps);
    handleClickOutside: (e: MouseEvent) => void;
    handleInputClick: (e: React.MouseEvent) => void;
    handleOpenChange(open: boolean): void;
    isDropdownVisible(): boolean | undefined;
    closeDropdown: () => void;
    handleClear: (e: React.MouseEvent) => void;
    render(): React.ReactNode;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<PickerProps>, prevState: Readonly<PickerState>, snapshot?: any): void;
    componentWillUnmount(): void;
}
export default Picker;
