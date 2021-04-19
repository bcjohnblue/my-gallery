import React, { useState } from 'react';
import DaDaTong_I18n_TW from '@/assets/img/dadatong/i18n_tw.png';
import DaDaTong_I18n_CN from '@/assets/img/dadatong/i18n_cn.png';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import SlideShowItemTemplatesStyled from './SlideShowItemTemplatesStyled';

const Styled = {
  ...SlideShowItemTemplatesStyled,
  ImgContainer: styled.div`
    position: relative;
    height: 240px;
  `,
  TextAnnotation: styled.div`
    font-size: 0.87em;
    font-weight: bold;
    margin-bottom: 7px;
  `,
};

const title = 'Internationalization and Localization';
const list = [`Implemented by using <code>next-i18next</code>.`];

const SlideShowItemLocalization: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const onChange = (index: number) => {
    setSelectedItem(index);
  };

  const getCaption = (index: number) => {
    switch (index) {
      case 0:
        return 'Traditional Chinese';
      case 1:
        return 'Simplified Chinese';
      default:
        break;
    }
  };

  return (
    <figure>
      <figcaption>
        <h3>{title}</h3>
        <ol>
          {list.map((text, index) => (
            <Styled.ListItem
              key={index}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </ol>
      </figcaption>
      <Styled.ImgContainer>
        <Styled.TextAnnotation>
          {getCaption(selectedItem)}
        </Styled.TextAnnotation>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          selectedItem={selectedItem}
          onChange={onChange}
        >
          <img src={DaDaTong_I18n_TW} alt="DaDaTong_I18n_TW" />
          <img src={DaDaTong_I18n_CN} alt="DaDaTong_I18n_CN" />
        </Carousel>
      </Styled.ImgContainer>
    </figure>
  );
};

export default SlideShowItemLocalization;
