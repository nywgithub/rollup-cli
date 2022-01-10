import * as React from 'react';
import { Component, ReactElement } from 'react';
interface DivProps extends React.HTMLProps<HTMLDivElement> {
    'data-testid'?: string;
}
export interface NoticeProps {
    namespace?: string;
    className?: string;
    style?: React.CSSProperties;
    duration?: number | null;
    type?: "success" | "error" | "warning" | "info";
    icon?: boolean | ReactElement;
    children?: React.ReactNode;
    updateMark?: string;
    /** Mark as final key since set maxCount may keep the key but user pass key is different */
    noticeKey: React.Key;
    closeIcon?: React.ReactNode;
    closable?: boolean;
    props?: DivProps;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onClose?: (key: React.Key) => void;
    /** @private Only for internal usage. We don't promise that we will refactor this */
    holder?: HTMLDivElement;
    /** @private Provided by CSSMotionList */
    visible?: boolean;
}
export default class Notice extends Component<NoticeProps> {
    static defaultProps: {
        onClose(): void;
        duration: number;
    };
    closeTimer: number | null;
    componentDidMount(): void;
    componentDidUpdate(prevProps: NoticeProps): void;
    componentWillUnmount(): void;
    close: (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined) => void;
    startCloseTimer: () => void;
    clearCloseTimer: () => void;
    restartCloseTimer(): void;
    render(): JSX.Element;
}
export {};
