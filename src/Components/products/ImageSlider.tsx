import React, { useState } from 'react'
import styled from 'styled-components';
import noImg from '../../assets/noimage.jpg'
import LeftArrow from '../../assets/left-arrow.svg'
import RightArrow from '../../assets/right-arrow.svg'

interface SliderProps {
  images: string[];
}

const ImageSlider: React.FC<SliderProps> = ({ images })=> {
  const [current, setCurrent] = useState(0);
  const [isZoomed , setIsZoomed] = useState(false);
  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const imageClick = () => {
    setIsZoomed(prev => !prev);
  }

  return (
    <>
      {isZoomed && (
        <Modal onClick={imageClick}>
          <ZoomedImage src={images[current]} alt="Zoomed slide"/>
        </Modal>
      )}
      <SliderWrapper>
        <PrevButton onClick={prevImage}>
          <img src={LeftArrow} alt='arrow'/>
        </PrevButton>
        <ImageContainer>
          <Image
            src={images.length > 0 ? images[current] : noImg}
            alt="Slide"
            onClick={imageClick}
          />
        </ImageContainer>
        <NextButton onClick={nextImage}>
          <img src={RightArrow} alt='arrow'/>
        </NextButton>
        <DotWrapper>
          {images.map((_, index) => (
            <Dot key={index} active={current === index} />
          ))}
        </DotWrapper>
      </SliderWrapper>
    </>
  )
}

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 500px;
  overflow: hidden;
  @media (max-width:768px) {
    width: 80%;
    height: 350px;
  }
`;

const ImageContainer = styled.div`
  width: 500px;
  height: 500px;
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
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
  img {
    width:20px;
    height: 20px;
  }
  @media (max-width:768px) {
    left:0
  }
`;

const NextButton = styled(Button)`
  right: 10px;
  img {
    width:20px;
    height: 20px;
  }
  @media (max-width:768px) {
    right:0
  }
`;

const DotWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width:786px) {
    bottom: 10px;
  }
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${props => props.active ? 'black' : 'gray'};
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ZoomedImage = styled.img`
  width: 70%;
  height : 90%;
  object-fit: contain;
  @media (max-width:768px) {
    width: 80%;
    height: 100%;
  }
`;

export default ImageSlider