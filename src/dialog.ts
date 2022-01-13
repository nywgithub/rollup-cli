import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import ArtDialog, { ArtDialogOptions } from '@future/art-dialog'

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export interface DialogInjectProps {
    confirmDialog?: (data?: any) => void;
    cancelDialog?: (err?: any) => void;
}

export type Options = Overwrite<
  Omit<ArtDialogOptions, 'content'>,
  {
    classList?: string[]
  }
>

export const getDialogInstance = (
  content: ReactElement,
  options: Options,
): ArtDialog => {
  const { classList = [] } = options

  return new ArtDialog({
    title: options.title,
    content: ``,
    init: function () {
      const contentElement = this.content()

      const dialogElement = contentElement.parentElement?.parentElement
      dialogElement &&
        classList.forEach((className) => {
          dialogElement.classList.add(className)
        })

      ReactDOM.render(content, contentElement, () => {
        this.position(this._left, this._top)
      })


      options.init && options.init.call(this)
    },
    lock: true,
    drag: false,
    resize: false,
    okVal: options.okVal,
    cancelVal: options.cancelVal,
    ok: options.ok,
    cancel: options.cancel,
    close() {
      const contentElement = this.content()
      ReactDOM.unmountComponentAtNode(contentElement)

      const dialogElement = contentElement.parentElement?.parentElement

      dialogElement &&
        classList.forEach((className) => {
          dialogElement.classList.remove(className)
        })

      options.close && options.close.call(this)
    },
  })
}

export type ArtDialogCalleeOptions = Overwrite<
  Options,
  {
    ok?: (this: ArtDialog, dialogPromiseResolve: (result?: any) => void) => void
    cancel?: (
      this: ArtDialog,
      dialogPromiseReject: (error?: any) => void,
    ) => void
  }
>

//弹窗回调处理
export const callDialog = <T = void>(
  content: ReactElement,
  options = {} as ArtDialogCalleeOptions,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const ok = options.ok

    const cancel = options.cancel

    if (ok) {
      options.ok = function () {
        ok.call(this, resolve)
      }
    }

    if (cancel) {
      options.cancel = function () {
        cancel.call(this, reject)
      }
    }

    let dialog: ArtDialog

    if (!options.close) {
      options.close = reject
    }

    dialog = getDialogInstance(
      React.cloneElement(content, {
        //表单关闭（提交/关闭）传递给父组件
        confirmDialog: (data: T) => {
          console.log(data)
          resolve(data)
          dialog && dialog.close()
        },
        cancelDialog: (err: any) => {
          console.log(err)
          reject(err)
          dialog && dialog.close()
        },
      }),
      (options as unknown) as Options,
    )

  })
}

