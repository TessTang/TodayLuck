import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";

import Button from "../../components/Button";
import ChangInfobtn from "../../components/ChangInfobtn";
import prepImages from "./assets/hadInfoPreventImg";

import { FaFeatherAlt } from "react-icons/fa";

//unsplash acessKey
const accessKey1 = "b033l85Vp4Jme9CFqQT3fswY1ZeNVHyQUVU_OmI-PfE";
const accessKey2 = "t3Wx9v5yFV5wdPcKy3_GkERkfs7tkBsB3xcJTqZDJNM";

export default function Hadinfo({ hadInfo }) {
  //抓圖片後=>先跑loading1秒再渲染
  //抓到後渲染圖片&按鈕

  //問候語
  const nowTime = new Date().getHours();
  let hello;
  if (nowTime < 11) {
    hello = "早安";
  } else if (nowTime < 18) {
    hello = "午安";
  } else if (nowTime < 24) {
    hello = "晚安";
  } else {
    hello = "你好!";
  }

  const [picResult, setPicResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //抓取資料並搜尋unsplash，若超過次數用accesskey2
  //若都失敗轉內部圖片

  useEffect(() => {
    const getPic = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/random?client_id=${accessKey1}&query=${hadInfo.love}&orientation=portrait&count=5`,
        );
        setPicResult(res.data);
      } catch (err) {
        try {
          const res = await axios.get(
            `https://api.unsplash.com/photos/random?client_id=${accessKey2}&query=${hadInfo.love}&orientation=portrait&count=5`,
          );
          setPicResult(res.data);
        } catch (err) {
          console.log(err, "內部圖片");
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    getPic();
  }, []);

  //loading component
  const LoadingPhoto = () => {
    return (
      <>
        <p className="fs-5 mb-auto ">
          今日圖片運送中
          <FaFeatherAlt />
        </p>
        <div className="loaderinHome mb-auto mx-auto"></div>
      </>
    );
  };

  //gotphoto component
  const GotPhoto = () => {
    return (
      <>
        <p className="fs-5">
          今日圖片抵達
          <FaFeatherAlt />
        </p>

        <Carousel className="homeHadimg">
          {picResult.map((val) => {
            return (
              <Carousel.Item key={val.id}>
                <a
                  href={val.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={val.urls.small} alt={val.alt_description} />
                </a>
              </Carousel.Item>
            );
          })}
        </Carousel>

        <small className="fst-italic fw-lighter d-block">
          - 點擊圖片可連結到Unsplash -
        </small>
        <Link to="/Today's_Luck">
          <Button buttonText={"吸飽了!"} />
        </Link>
      </>
    );
  };

  //prepare photo component
  const PrepPhoto = () => {
    return (
      <>
        <p className="fs-5">
          今日圖片抵達
          <FaFeatherAlt />
        </p>
        <Carousel className="homeHadimg">
          {prepImages[hadInfo.love].map((val) => {
            return (
              <Carousel.Item key={val.alt}>
                <img src={val.loc} alt={val.alt} />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <Link to="/Today's_Luck">
          <Button buttonText={"吸飽了!"} />
        </Link>
      </>
    );
  };

  //check if gotphoto
  const checkPhoto = () => (picResult.length ? <GotPhoto /> : <PrepPhoto />);

  return (
    <>
      <ChangInfobtn />
      <div className="flex-grow d-flex flex-column justify-content-between">
        <p className="fs-5 fw-bold bg-success width-fit px-5 py-1 rounded-5 lh-sm mx-auto">
          {hadInfo.name} {hello}!
        </p>
        {isLoading ? <LoadingPhoto /> : checkPhoto()}
      </div>
    </>
  );
}
