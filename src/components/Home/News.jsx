import React, { useState, useEffect } from 'react';
import './News.css';
import { NEWS_API_KEY } from '../../api.js';

const News = () => {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [img , setImg] = useState(undefined);

  useEffect(() => {
    handleNews();
  }, []);

  const handleNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const { articles } = data;
      setNews(data.articles[0]);
      setImg(articles[0].urlToImage);
      console.log(articles[0].urlToImage,img);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="news-container">
      {loading && img === undefined ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <>
          <div
            className="news-header"
          >
            <img src={img} alt="img" className='news-header-img'/>
            <div className="news-title">
              <h3 className="news-title-txt">{news.title}</h3>
              <p className="news-date">{news.publishedAt}</p>
            </div>
          </div>

          <div className="news">
            <p className="news-txt">{news.description}</p>
   
          </div>
        </>
      )}
    </div>
  );
};

export default News;
