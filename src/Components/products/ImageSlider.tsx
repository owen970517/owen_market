import React, { useState } from 'react'
import styled from 'styled-components';
import noImg from '../../ImgSrc/noimage.jpg'

interface SliderProps {
    images: File[];
}

const ImageSlider: React.FC<SliderProps> = ({ images })=> {
    const [current, setCurrent] = useState(0);

    const nextImage = () => {
      setCurrent(current === images.length - 1 ? 0 : current + 1);
    };
  
    const prevImage = () => {
      setCurrent(current === 0 ? images.length - 1 : current - 1);
    };
  
    return (
      <SliderWrapper>
          <PrevButton onClick={prevImage}>이전</PrevButton>
          <Image src={images.length > 0 ? images[current] : noImg} alt="Slide" />
          <NextButton onClick={nextImage}>다음</NextButton>
          <DotWrapper>
              {images.map((_, index) => (
              <Dot key={index} active={current === index} />
              ))}
          </DotWrapper>
      </SliderWrapper>
    )
}

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 400px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 70%;
  height: 500px;
  object-fit: contain;
  border-radius: 10px;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const DotWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${props => props.active ? 'black' : 'gray'};
`;

export default ImageSlider