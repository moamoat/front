import citycount from '../image/citycount.png';
import firename from '../image/firename.png';
import house_count from '../image/house_count.png';
import house_people from '../image/house_people.png';
import housecount from '../image/housecount.png';
import roadposs from '../image/roadposs.png';
import serviceposs from '../image/serviceposs.png';
import storecount from '../image/storecount.png';
import distance from '../image/distance.png';
import money from '../image/money.png';
import trash from '../image/trash.png';
import location from '../image/location.png';
import {Bar, Doughnut} from "react-chartjs-2";
import React, { useState } from 'react'
import { Menu, Modal } from 'antd'

const { SubMenu } = Menu;



function Case({ lists },e) {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const [addr, setAddr] =useState();
    async function callApi(e) {
        
        var number = [fixlist[e.key].props.children[6], fixlist[e.key].props.children[8]]
        setAddr(fixlist[e.key].props.children[2])
        var req = new XMLHttpRequest();
        req.open('POST', "https://hh8ur8dp8h.execute-api.ap-northeast-2.amazonaws.com/api-gateway-lambda-app-server", true);
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                console.log("Status: ", req.status);
                console.log(JSON.parse(req.responseText));
                setData(JSON.parse(req.responseText))
                setVisible(true)
              
            }
            
        };
       
        req.send(number)

    }
    const data2 = {
        labels: ['강남', '노원','마포', '양천', '새로운 곳'],
        datasets: [
          {
            label: '가동률',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [Number(data.openroute_service?.[0]).toFixed(4)*100, Number(data.openroute_service?.[1]).toFixed(4)*100, Number(data.openroute_service?.[2]).toFixed(4)*100, Number(data.openroute_service?.[3]).toFixed(4)*100, Number(data.openroute_service?.[4]).toFixed(4)*100]
            
          },
          {
            type: 'line',
            label: '기존 5년 평균 가동률',
            data: [116.252,
            71.4385,
            92.972,
            88.338
            ],
            borderColor: 'rgb(29, 28, 99)',
            backgroundColor: 'rgb(29, 28, 99)',
            stack: 'combined'
          }
        ]
      };
     
      const data3 = {
        labels: ['새로운거','기존'],
        datasets: [
          {            
              
       
          label: '거리',
          backgroundColor: ['rgba(255,99,132,0.4)','rgb(29, 28, 99)'],
          borderColor: ['rgba(255,99,132,0.4)','rgb(29, 28, 99)'],
          borderWidth: 1,
          hoverBackgroundColor: ['rgba(255,99,132,0.4)','rgb(29, 28, 99)'],
          hoverBorderColor: ['rgba(255,99,132,0.4)','rgb(29, 28, 99)'],
          data: [Number(data.openroute_service?.[5]).toFixed(2), Number(data.openroute_service?.[6]).toFixed(2)]
        ,hoverOffset: [4,4]
          },
         
        ]
        

        
      };


      const data4 = {
        labels: ['새로운거', '기존'],
        datasets: [
          {
            label: '비용',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [Number(data.openroute_service?.[7]).toFixed(0), Number(data.openroute_service?.[8]).toFixed(0)]
            
          },
         
        ]
      };

    const fixlist = lists.map((list, index) => (
        <Menu.Item
            key={index}
            style={{ padding: 0 }}
            onClick={callApi}

        >
            {index+1}. { list.name} <br/> 위도: { list.position.La}, 경도: { list.position.Ma}
        </Menu.Item >)
    );


    
   
    

    return (
        <>
            <div className="menulist">
                <Menu
                    
                    style={{ width: 500 }}
                    mode="inline"
                >
                    <SubMenu key="sub1" title="저장된 기록" >
                        {/* 리스트 추가 push해서 클릭값들 받기 */}
                        {fixlist}
                    </SubMenu>
                </Menu>
            </div>
            <div>
            </div>
            <Modal

                title="상세 분석 보고서"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <div className="check">
                    {data?.storecount ? 
                    <div>
                        <div style={{fontSize:'20px'}}><img src={location} alt="nope"/> {addr} </div>
                        <hr /> 
                        <br />
                        
                        
                        <span>
                            <strong><img src={storecount} alt="nope"/>반경 300m내 있는 상업지역은 <span style={{color:'LightCoral',fontSize:'25px'}}>{data['storecount']}</span>    개입니다.</strong>
                        </span>
                        <hr /> 
                        <br />
                        
                        <div>
                            <strong>가장 가까운 상업 지역의 거리는    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data['storemin']).toFixed(2)} m </span>    입니다.</strong>
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong><img src={citycount} alt="nope"/>반경 300m내 있는 도심권은    <span style={{color:'LightCoral',fontSize:'25px'}}>{data['citycount']}</span>    개입니다.</strong> 
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong>가장 가까운 도심권 지역의 거리는    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data['citymin']).toFixed(2)}m</span>    입니다.</strong>
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong><img src={firename} alt="nope"/>반경 500m내 있는 가까운 폐열 소요처는    <span style={{color:'LightCoral',fontSize:'25px'}}>{data['firecount']}</span>    개입니다.</strong>  
                            <li>{data['firename'].length <3 ? null :data['firename']}</li> 
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong><img src={housecount} alt="nope"/>반경 300m내 있는 주거지역은    <span style={{color:'LightCoral',fontSize:'25px'}}>{data.housecount}</span>    개입니다.</strong>
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong>가장 가까운 주거지역과 거리는    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.housemin).toFixed(2)}m</span>    입니다.</strong> 
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong><img src={house_people} alt="nope"/>반경 2km내 총 주거 인구는    <span style={{color:'LightCoral',fontSize:'25px'}}>{parseInt(data.house_people).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>    명입니다.</strong> 
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong><img src={house_count} alt="nope"/>반경 2km내 총 가구 수는    <span style={{color:'LightCoral',fontSize:'25px'}}>{parseInt(data.house_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>    세대입니다.</strong> 
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong><img src={roadposs} alt="nope"/>반경 300m내 있는 도로는    <span style={{color:'LightCoral',fontSize:'25px'}}>{data.roadcount}</span>    개입니다.</strong> 
                            <li>{data.roadposs.length <3 ? null : data.roadposs }</li>  
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong>가장 가까운 도로까지의 거리는    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.roadmin).toFixed(2)}m</span>    입니다.</strong>
                            <li>{data.roadcan.length <3 ? null : data.roadcan }</li>  
                        </div>
                        <hr /> 
                        <br />
                        <div>
                           
                            
                            <strong><img src={serviceposs} alt="nope" />반경 300m내 있는 생활서비스는    <span style={{color:'LightCoral',fontSize:'25px'}}>{data.servicecount}</span>    개입니다.</strong> 
                            <li>{data.serviceposs.length <3 ? null : data.serviceposs }</li>
                        {/* </div>
                        <hr /> 
                        <br /> */}
                        </div>
                        <hr /> 
                        <br />
                      
                        <div>
                        <strong><img src={trash} alt="nope" />강남자원회수시설의 가동률은    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[0]).toFixed(4)*100}%</span>    입니다.</strong> 
                            
                        </div>
                        <hr /> 
                        <br />
                        <div>
                        <strong><img src={trash} alt="nope" />노원자원회수시설의 가동률은    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[1]).toFixed(4)*100}%</span>    입니다.</strong>
                            
                        </div>
                        <hr /> 
                        <br />
                        <div>
                        <strong><img src={trash} alt="nope" />마포자원회수시설의 가동률은    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[2]).toFixed(3)*100}%</span>    입니다.</strong>
                           
                        </div>
                        <hr /> 
                        <br />
                        <div>
                        <strong><img src={trash} alt="nope" />양천자원회수시설의 가동률은    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[3]).toFixed(3)*100}%</span>    입니다.</strong>
                      
                        </div>
                        <hr /> 
                        <br />
                        <div>
                        <strong><img src={trash} alt="nope" />새로운자원회수시설의 가동률은    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[4]).toFixed(4)*100}%</span>    입니다.</strong>
             
                        </div>
                        <hr /> 
                        <br />

                        <div >
                            <Bar
                                data={data2}
                                id ="barchart"
                                options={{
                                    maintainAspectRatio: true
                                }}/>
                        </div>
                        <div>
                        <strong><img src={distance} alt="nope" />새로운자원회수시설의 총 거리는    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[5]).toFixed(2)}km</span>    입니다.</strong> 
                         
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong>기존자원회수시설의 총 거리는    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[6]).toFixed(2)}km</span>    입니다.</strong>
          
                        </div>
                        <hr /> 
                        <br />

                        <div >
                            <Doughnut
                                data={data3}
                                id ="barchart2"
                                options={{
                                    maintainAspectRatio: true
                                }}/>
                        </div>
                        <div>
                        <strong><img src={money} alt="nope" />새로운자원회수시설의 총 비용은    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[7]).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>    원입니다.</strong> 
                            
                        </div>
                        <hr /> 
                        <br />
                        <div>
                            <strong>기존자원회수시설의 총 비용    <span style={{color:'LightCoral',fontSize:'25px'}}>{Number(data.openroute_service?.[8]).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>    원입니다.</strong>
                    
                        </div>
                        <hr /> 
                        <br />

                        <div >
                            <Bar
                                data={data4}
                                id ="barchart"
                                options={{
                                    maintainAspectRatio: true
                                }}/>
                        </div>
                        <div className="dis">
                            <div className="origin">
                                <strong>기존 강남자원회수시설에 분배되는 자치구</strong>
                                <div>['강남구', '강동구', 관악, 광진, 동작, 서초, 성동, 송파]</div>
                            </div>
                            <div className="change">
                                <strong>강남자원회수시설에 분배되는 자치구</strong>
                                <li>{(data.openroute_service?.[9])}</li>
                            </div>
                        </div>
                        <hr /> 
                        <br />
                        <div className="dis">
                            <div className="origin">
                                <strong>기존 노원자원회수시설에 분배되는 자치구</strong>
                                <div> 중랑, 성북, 강북, 도봉, 노원, 동대문</div>
                            </div >
                            <div className="change">
                                <strong>노원자원회수시설에 분배되는 자치구</strong>
                                <li>{(data.openroute_service?.[10])}</li>
                            </div>
                        </div>
                        <hr /> 
                        <br />
                        <div className="dis">
                            <div className="origin">
                                <strong>기존 마포자원회수시설에 분배되는 자치구</strong>
                                <div>종로, 중구, 용산, 서대문, 마포</div>
                            </div>
                            <div className="change">
                                <strong>마포자원회수시설에 분배되는 자치구</strong>
                                <li>{(data.openroute_service?.[11])}</li>
                            </div>
                        </div>
                        <hr /> 
                        <br />
                        <div className="dis">
                            <div className="origin">
                                <strong> 기존 양천자원회수시설에 분배되는 자치구</strong>
                                <div>양천, 강서, 영등포</div>
                            </div>
                                <div className="change">
                                <strong>양천자원회수시설에 분배되는 자치구</strong>
                                <li> {(data.openroute_service?.[12])}</li>
                            </div >
                        </div>
                        <hr /> 
                        <br />
                        <div className="dis">
                            <div className="origin">
                                <strong>기존 새로운자원회수시설에 분배되는 자치구</strong>
                                <div> 새로 지어지는 거라 없습니다.</div>
                            </div >
                            <div className="change">
                            <strong>새로운자원회수시설에 분배되는 자치구</strong>
                            <li> {data.openroute_service?.[13]}</li>
                                </div >
                        </div>
                        <hr /> 
                        <br />
                        
                    </div>
                    : <div>다시 시도해 주세요 !</div>}
             </div>
            </Modal>
        </>
    )
}
export default Case;