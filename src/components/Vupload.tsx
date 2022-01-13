import React from 'react'
import { Upload } from '@future/upload/dist/react'

export interface VuploadProps {
  action: string
}
class Vupload extends React.Component<VuploadProps> {
  constructor(props: VuploadProps) {
    super(props)
    this.state = {
      imgList: []
    }
  }
  onSuccess(response: object, file: any, xhr: object) {
    console.log(response, file, xhr)
    let imgList = this.state.imgList
    imgList.push(xhr.response)
    this.setState({
        imgList
    },()=>{console.log(this.state.imgList)})
    
  }
  deleteImg(e:React.MouseEvent<HTMLElement, MouseEvent>,  item:string){
      console.log(e,item)
    e.preventDefault()
    let imgList = this.state.imgList
    imgList.slice(item)
    this.setState({
        imgList
    },()=>{console.log(this.state.imgList)})
  }
  render(): React.ReactNode {
    const { action } = this.props
    const { imgList, number } = this.state
    const imgs = imgList.map((item:string,index:number)=>{
        return (
            <li key={index}>
                <i onClick={(e)=>{this.deleteImg.bind(e, item)}}>⭐</i>
                <img src={item} />
            </li>
        )
    })
    return (
      <>
        <Upload
          accept=".jpg,.jpeg,.png"
          name="file"
          action={action}
          beforeUpload={(file) => {
            console.log('>>>>>>>>>', file.type)
          }}
          onSuccess={(response, file, xhr) => {
            this.onSuccess(response, file, xhr)
          }}
        >
          <span>上传</span>
          <span>{imgList.length}</span>
        </Upload>
        <ul className="img-list">
          {imgs}
        </ul>
      </>
    )
  }
}

export default Vupload
