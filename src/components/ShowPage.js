// import React, { useState } from 'react'
// import { List, Typography } from 'antd'

// //클릭 값 받아서 페이지 보여주기
// function ShowPage({ list }) {

//     const [change, setChange] = useState(false)




//     //이게 두번 찍히는 이유가 뭘까 ?

//     return (
//         <>
//             <button onClick={e => {
//                 setChange(true)
//             }}>
//                 기록확인 할래?
//             </button>
//             {/* <input value='기록확인' type='button' onClick={e => setChange(true)} /> */}
//             {change ? <OpenList /> : null}
//         </>
//     )
// }
// // 여기는 리스트안에 카드 함수
// function OpenList({ list }) {

//     console.log(list)
//     return (
//         <div>
//             <List
//                 size="small"
//                 bordered
//                 dataSource={list}
//                 renderItem={item => (
//                     <List.Item>
//                         <Typography.Text mark>
//                             {item.id}<button vlaue="자세히 보기 " />
//                         </Typography.Text>
//                     </List.Item>
//                 )}
//             />


//         </div>
//     )
// }

// export default ShowPage;