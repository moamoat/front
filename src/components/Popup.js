import React, { useState } from 'react';
import { Modal } from 'antd';
import final from '../image/final.png';




function Popup() {
    const [yes, setYes] = useState(true);

    // time 값 받아와서 저장



    const handleCancelButton = () => {
        setYes(false)


    }
    // const handleOKButton = () => {
    //     setYes(false)
    //     Cookies.set('CookieCheck', 'confirm', { expires: 7 })
    // }


    return (
        <div>
                <Modal
                    id="temp"
                    title="공지"
                    visible={yes}
                    onCancel={handleCancelButton}
                    maskClosable="false"
                >
                    

             ※ 모든 서비스는 서울시 자원회수시설 입지선정에 대한 평가를 위해 만들어졌음을 공고합니다
             

             <p></p>
             
             <h2><strong><li>사용 방법 </li></strong></h2>
             <h3><li>   1. 위치를 검색하거나 지도를 누르면 해당 위치에 대한 주소가 저장된 기록에 저장됩니다. </li></h3>
             <h3><li>  2. 저장된 기록에 있는 주소를 누르면 해당 주소에 대한 상세보고서가 뜹니다. </li></h3>

             <img src= {final} style={{ "width":"450px", "height" : "650px"}} />

                </Modal>)
               


        </div>
    )

}


export default Popup;