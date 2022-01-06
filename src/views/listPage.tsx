import * as React from 'react'
import '../css/common.scss'
import ReactDOM from "react-dom";

interface listPageProps {

}

const ListPage: React.FC<listPageProps> = (props) => {
    return(
        <div>
            ListPage
            <div>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </div>
        </div>
    )
}

ReactDOM.render(
  <ListPage />,
  document.getElementById("app")
);