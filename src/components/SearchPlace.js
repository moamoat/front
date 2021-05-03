import React, { useState } from 'react'



function SearchPlace({ onCreate }) {
    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

    const onChange = (e) => {
        setInputText(e.target.value)
    };
    const handleSubmit = (e) => {
        setPlace(inputText);
        setInputText(""); // 값 초기화
        e.preventDefault(); // 페이지 변경 금지.
        onCreate(place)
        //값을 부모로 부터 받은 onCreate를 통해 전달 .

    };

    return (
        <>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input
                    style={{ width: '300px' }}
                    placeholder="검색하세요"
                    onChange={onChange}
                    value={inputText}
                ></input>
                <button type="submit">검색!</button>
            </form>
            {/* <MapContainer searchPlace={place} /> */}
            {/* 이렇게 쓰면 무한루프돔 */}
        </>
    )
}


export default SearchPlace;