import React, { ReactElement, ReactNode, RefObject } from "react";
import "../css/index.scss";
import "@future/checkbox/dist/style.scss";
export declare type SelectedData = {
    value: string;
    label: string;
};
export interface SelectProps {
    className?: string;
    id?: string;
    name?: string;
    value: string | string[];
    placeholder?: string;
    displayTop?: boolean;
    disabled?: boolean;
    bordered?: boolean;
    error?: boolean;
    icon?: ReactElement | string;
    clear?: boolean;
    multiple?: boolean;
    selectedRender?: (options: Array<SelectedData>) => ReactElement;
    selectedFormat?: (value: string[]) => string;
    onFocus?: (event: MouseEvent) => void;
    onBlur?: (event: MouseEvent) => void;
    onChange?: (value: string | string[]) => void;
    onClear?: () => void;
    onDropdownVisibleChange?: (visible: boolean) => void;
}
interface SelectState {
    visible?: boolean;
    hasFocusClass: boolean;
    selectedLabel: ReactNode;
}
export declare class Select extends React.Component<SelectProps, SelectState> {
    listRef: RefObject<HTMLUListElement>;
    selectWrapperRef: RefObject<HTMLDivElement>;
    constructor(props: any);
    handleSelectClick: (e: MouseEvent) => void;
    positionSelected(): void;
    handleBlur: (e: MouseEvent) => void;
    closeDropdown(): void;
    handleClear: () => void;
    handleOptionSelect(val: string): void;
    isSelected(optionVal: string): boolean;
    getOptionLabel(option: ReactElement): any;
    findLabelByVal(options: ReactElement[], val: string): any;
    listSelectedData(options: ReactElement[]): SelectedData[];
    renderOptionList(options: ReactElement[], groupDisabled?: boolean): false | JSX.Element;
    renderNativeOption(option: ReactElement): JSX.Element;
    render(): React.ReactNode;
    componentDidUpdate(prevProps: Readonly<SelectProps>, prevState: Readonly<SelectState>, snapshot?: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
export {};
