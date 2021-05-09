import React from 'react'
import { Menu } from 'antd'
// import logo from './logo.svg'
// import './src/Css/Case.css';



const { SubMenu } = Menu;
// connectPython_print.js 파일 
// const spawn = require('child_process').spawn;
// const result = spawn('python', ['print.py']); 
// result.stdout.on('data', function(data) { 
//     console.log(data.toString()); 
// }); 
// result.stderr.on('data', function(data) { 
//     console.log(data.toString());
// });
function Case({ lists }) {

    // const content = {
    //     //기록값 넘겨 받자 .
    // }
    const handleClick = e => {
        console.log('click', e)

    }
    // 이름과 주소값 받아오기.

    const fixlist = lists.map((list, index) => (
        <Menu.Item key={index} style={{ padding: 0 }}>
            { index + 1}: 위치: { list.name} 위도: { list.position.La}, 경도: { list.position.Ma}
        </Menu.Item >));

    // const { spawn } = require('child_process');
    // const result = spawn('python', ['print.py']); 
    // result.stdout.on('data', function(data) { 
    //     console.log(data.toString()); 
    // }); 
    // result.stderr.on('data', function(data) { 
    //     console.log(data.toString());
    // });


    console.log(fixlist)
    return (
        <>
            <div className="menulist">
                <Menu
                    onClick={handleClick}
                    style={{ width: 500 }}
                    mode="inline"
                >
                    <SubMenu key="sub1" title="저장된 기록" >
                        {/* 리스트 추가 push해서 클릭값들 받기 */}
                        {fixlist}
                    </SubMenu>
                </Menu>
                
            </div>


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