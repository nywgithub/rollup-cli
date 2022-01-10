

export default interface IComponent<P> {

    //组件生命周期
    init: () => void; //组件初始化，只调用一次
    render: () => void; //组件渲染时调用
    beforeUpdate: () => boolean; //组件更新前调用，返回Bool判断是否执行updated
    update: (_: any) => void; //组件更新时调用
    updated: () => void; //组件更新后调用
    /*   mounted: () => any; //挂载到DOM树时调用
      unmounted: () => any; //组件从DOM树卸载后调用 */
    destroy: () => void; //组件销毁后调用

    emit: (eventName: string, ...args: any) => any;
    on: (eventName: string, fn: () => void, context?: any) => any;
    addListener: (eventName: string, fn: () => void, context?: any) => any;
    once: (eventName: string, fn: () => void, context?: any) => any;
    off: (
        eventName: string,
        fn?: () => void,
        context?: any,
        once?: boolean
    ) => any;
    removeListener: (
        eventName: string,
        fn?: () => void,
        context?: any,
        once?: boolean
    ) => any;

    log: () => void; //日志记录，可记录在控制台或者内存中。用来取代console.log
}
