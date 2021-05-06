import React, {useState , useEffect} from 'react'
import { Menu, Modal  } from 'antd'

const { SubMenu } = Menu;

function Case({ lists }) {
    const [visible, setVisible] = useState(false);
    const [number, setNumber] =useState(0);
    const [la,setLa] =useState(0)
    const [ma,setMa] =useState(0)

    // const content = {
    //     //기록값 넘겨 받자 .
    // }
    // const handleClick = e => {
    //     console.log('click', e)

    // }
    // 이름과 주소값 받아오기.
    

    const fixlist = lists.map((list, index) => (
        <Menu.Item 
        key={index} 
        style={{ padding: 0 }} 
        // onclick={()=>setVisible(true)}
        >  
            { index + 1}: 위치: { list.name} 위도: { list.position.La}, 경도: { list.position.Ma}
        </Menu.Item >)
        );
        //보이게 설정

//    const result_02 = spawn('python', ['list.position.Ma', 'list.position.La']); result_02.stdout.on('data', (result)=>{ console.log(result.toString()); });
    const positionpass = (e)=>{ 
        //  위 경도 값 넘기면서 모달창 띄워야함 
        setVisible(true)
        setNumber(e.key)
        // 배열의 인덱스 값 
        
        // console.log(number) 비동기니까 업데이트 안되서 useEffect 사용했고 
        console.log(fixlist[number].props)
        // console.log(fixlist[number].props.children[4],fixlist[number].props.children[6])
        setLa(fixlist[number]?.props?.children[4])
        setMa(fixlist[number]?.props?.children[6])
        
    }
    // const lama= () => {
       
    //     console.log(fixlist[1].props)
       
    // }
      useEffect((e) =>{
        // setLa(fixlist[number].props.children[4])
        // setMa(fixlist[number].props.children[6])
        console.log(fixlist[1].props)
        // console.log(fixlist[number].props)
        // console.log(la,ma)
    },[number])
    console.log(fixlist)
    return (
        <>
            <div className="menulist">
                <Menu
                    onClick={positionpass}
                    style={{ width: 500 }}
                    mode="inline"
                >
                    <SubMenu key="sub1" title="저장된 기록" >
                        {/* 리스트 추가 push해서 클릭값들 받기 */}
                        {fixlist }
                    </SubMenu>
                </Menu>
            </div>
            <Modal
             title="세부 정보"
             visible={visible}
             onCancel={() => setVisible(false)}
                >
                <p>안녕</p>
            </Modal>

        </>

    )
}

export default Case;

























// import { List, Typography } from 'antd'
// import React from 'react'


// // 여기는 리스트안에 카드 함수
// function OpenList ( {list}) {

//     console.log(list)
//     return(
//         <div>
//             <List
//             size="large"
//             bordered
//             dataSource={list}
//             renderItem={item => (
//                 <List.Item>
//                     <Typography.Text mark>
//                     {item.id}<button vlaue="자세히 보기 "/>
//                     </Typography.Text>
//                 </List.Item>
//             )}
//             />


//         </div>
//     )
// }

// export default OpenList;