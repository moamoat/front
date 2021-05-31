import React, { useEffect, useState } from 'react';
import SearchPlace from './SearchPlace'
import Case from './Case'

import '../Css/MapContainer.css'
const { kakao } = window;

function MapContainer() {
    const [a, setA] = useState({
        // id:1,
        name: '서울특별시 센터',
        position: { La: 126.97863092300126, Ma: 37.56399493761861 }
    })
    const [b, setB] = useState([])
    // const [id, setId] = useState(0)
    const [place, setPlace] = useState('서울시')
    
    // const [name, setName] = useState('')


    const handleCreate = (data) => {
        // console.log(data)
        setPlace(data)

    }
    useEffect(() => {
        //geocoder -> 주소를 좌표로 변환 객체.
        let geocoder = new kakao.maps.services.Geocoder();
        var iwRemoveable = true;

        let infowindow = new kakao.maps.InfoWindow({
            zIndex: 1,
            removable: iwRemoveable
        });
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), //지도의 중심좌표.
            level: 3  //지도의 레벨(확대, 축소 정도) 
        };
        const map = new kakao.maps.Map(container, options)
        const ps = new kakao.maps.services.Places();
        //장소 검색 객체 생성.

        ps.keywordSearch(
            place,
            placesSearchCB);
        //키워드로 장소 검색


        let zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다


        function placesSearchCB(data, status) {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위 재설정
                //Lat 객체에 좌표 추가.
                let bounds = new kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                    // displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                map.setBounds(bounds);
            }
        }

        let marker = new kakao.maps.Marker()


        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    let detailAddr = !!result[0].road_address ?
                        '<div>도로명 주소 : ' + result[0].road_address.address_name + '</div>' : '';
                    detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

                    let content = `<div className="bAddr">
                        <span className="title">법정동 주소정보 </span> <button onclick="window.markerClick()">저장 </button>
                        ${detailAddr}   </div>`
                    //안에 컨텐츠

                    // 마커를 클릭한 위치에 표시합니다 
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })

        })
        // setstate(map);

        // function closeOverlay() {
        //     overlay.setMap(null);     
        // }
        // overlay.setContent(content);


        //latlng.getLat() ,latlng.getLng() 위도 경도 정확한 값

        // 행정동 주소가 있으면 그걸 주고 없으면 법정동 상세주소 를 주자(도로명 주소)
        window.markerClick = () => {
           
            alert('저장 되었습니다.')
            let x = {
                name: infowindow.a.innerText.slice(12,) ,
                position: marker.getPosition(),
            } 
            // console.log(x.name)

            setA(x)



        }
       

        kakao.maps.event.addListener(map, 'idle', function () {
            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });
        //중심 좌표나 확대 변경시 , 지도 중심 좌표에  대한 주소 정보 표시

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var infoDiv = document.getElementById('centerAddr');

                for (var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        infoDiv.innerHTML = result[i].address_name;
                        break;
                    }
                }
            }
        }

    }, [place]);
    // 두번째 인자 검색값이 달라지면 useEffect 실행.
    // id 값 바꿔야 실행되네  그리고 useState 비동기네 
    useEffect(() => {
        setB([...b, a])
    }, [a])

    // useEffect(() => {
    //     setId(id + 1)
    //     console.log(id)


    // }, [a])




    return (
        <>
            <Case lists={b} />

            <div>
                <div className="hAddr"
                // style={{
                //     position: 'absolute', left: '200px', top: '10px',
                //     borderRadius: '2px', background: '#fff', zIndex: 1, padding: '5px'
                // }}
                >
                    <span className="title">지도중심기준 행정동 주소정보 </span>
                    <span id="centerAddr"></span>
                </div>
                <div id="map" style={{ width: '900px', height: '500px' }} />

                <SearchPlace onCreate={handleCreate} />
            </div>
            



            {/* 받는지 확인하는 메소드  props로 전달*/}
            {/* <ShowPage list={b} /> */}
            {/* <OpenList list={b} /> */}

        </>

    );
}


export default MapContainer;