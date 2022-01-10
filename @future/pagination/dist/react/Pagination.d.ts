import React from "react";
import { BranchView } from "mango-rc-widgets";
import "../css/index.scss";
declare type HTMLAnchorTarget = "_self" | "_blank" | "_parent" | "_top";
export interface PaginationProps {
    className?: string;
    pageNo: number;
    pageSize: number;
    total: number;
    formatURL?: (pageNo: number) => string;
    target?: HTMLAnchorTarget;
    onChange?: (pageNo: number) => void;
    isSimple?: boolean;
    showPrev?: boolean;
    showNext?: boolean;
}
interface PaginationState {
    centerPages: number[];
    pagesCount: number;
    showPrevMore?: boolean;
    showNextMore?: boolean;
}
declare class Pagination extends React.Component<PaginationProps, PaginationState> {
    private static readonly NONE_URL;
    private static readonly DEFAULT_PAGER_COUNT;
    static defaultProps: {
        showPrev: boolean;
        showNext: boolean;
    };
    NormalView: BranchView;
    SimpleView: BranchView;
    constructor(props: PaginationProps);
    getPagesCount(): number;
    updateShowMore(): void;
    getCenterPages(): number[];
    urlFactory(pageNo: number): string;
    handlePageChange: (newPageNo: number) => void;
    render(): React.ReactNode;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<PaginationProps>): void;
}
export default Pagination;
