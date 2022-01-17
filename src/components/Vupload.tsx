import React, {createRef, LegacyRef} from 'react'
import Upload from 'rc-upload'
import {
  RcFile , UploadProps
} from 'rc-upload/lib/interface';
import { toast } from "@future/toast/dist/react"
export interface VuploadState {
    accept:string
    imgList: string[] //上传图片后列表
    fileSize: number  //文件大小
    // loading: boolean   //加载效果
    message: {
        size?: string
        same?: string
        format?: string
    }
    max:number
}
export interface VuploadProps extends UploadProps {
  size?:number // 限制的大小
  //   loading?: boolean //是否出现加载效果
  max?:number //文件最大数量限制
  errorMessage?: {
    size?: string
    same?: string
    format?: string
  }
}
const duration = 3000

//TODO: “ || ”可以改成defaultProps写法 不止图片
class Vupload extends React.Component<VuploadProps, VuploadState> {
  uploadRef: LegacyRef<Upload> | undefined;
  constructor(props: VuploadProps) {
    super(props)
    const { accept, size, errorMessage, max } = this.props
    this.uploadRef = createRef();
    this.state = {
      imgList: [],
      accept: accept || '.jpg,.jpeg,.png,.bmp', 
      fileSize: size || 5,
    //   loading: false,
      message: errorMessage || {
          size:'Each image shouldn’t exceed 5M.',
          same:'You have already uploaded this image.',
          format:'Please upload images as JPG, JPEG, PNG and BMP.'
      },
      max: max || 5
    }
  }
  warning(mes: string){
      toast(mes, { duration: duration * 100, type: "error" })
  }
  beforeUpload(file:any, FileList:any){
      console.log(file, FileList)
      const { accept, fileSize, message, max, imgList } = this.state
      const { size, name } = file
      this.props.beforeUpload && this.props.beforeUpload(file, FileList)
      return new Promise((resolve, reject) => {
        let index = name.lastIndexOf('.')
        let typeArry = accept.split(',')
        let suffer = (name as string).substring(index, name.length)
        if (typeArry.indexOf(suffer) < 0) {
            message.format && this.warning(message.format)
            // this.uploadRef.current?.abort({ ...file })
            //rc-upload抛出错误
            reject(message.format)
        }
        if((size / 1024 / 1024) > fileSize){
            message.size && this.warning(message.size) && alert(1)
            //rc-upload抛出错误
            reject(message.size)
        }
        if((imgList.length + FileList.length) >= max){

        }
        //TODO:图片相同判断

        resolve(file)
      })
      
  }
  onError(){

  }
  onSuccess(response: object, file: RcFile , xhr: object) {
    console.log(response, file, xhr)
    let imgList = this.state.imgList
    imgList.push(xhr.response)//此处为接口返回图片地址
    this.setState(
      {
        imgList,
      },
      () => {
        console.log(this.state.imgList)
      },
    )
    this.props.onSuccess && this.props.onSuccess(response, file, xhr)
  }
  deleteImg(e: React.MouseEvent<HTMLElement, MouseEvent>, index: number) {
    e.preventDefault()
    let imgList = this.state.imgList
    imgList.splice(index, 1)
    this.setState(
      {
        imgList,
      },
      () => {
        console.log(this.state.imgList)
      },
    )
  }
  render(): React.ReactNode {
    const { imgList } = this.state
    const imgs = imgList.map((item: string, index: number) => {
      return (
        <li key={index}>
          <i
            onClick={(e) => {
              this.deleteImg(e, index)
            }}
          >
            ⭐
          </i>
          <img src={item} />
        </li>
      )
    })
    return (
      <>
        <Upload
          ref={this.uploadRef}
          {...this.props}
          onError={this.onError}
          beforeUpload={(file,FileList) => {
            this.beforeUpload(file,FileList)
          }}
          onSuccess={(response, file, xhr) => {
            this.onSuccess(response, file, xhr)
          }}
        >
          <span>
            <i className="ft-icon icon-attachment"></i>
            上传图片
            <span>{imgList.length}</span>
          </span>
        </Upload>
        <ul className="img-list">{imgs}</ul>
      </>
    )
  }
}

export default Vupload
