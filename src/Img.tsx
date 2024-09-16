import React, { useState } from 'react';
import styled from 'styled-components';

interface ImgProps {
  width: number;
  height: number;
  alt: string;
  src: string;
  loader?: React.ReactNode;
}

const Container = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

export const Img: React.FC<ImgProps> = ({ width, height, alt, src, loader }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Container width={width} height={height}>
      {isLoading && <Loader>{loader || 'Loading...'}</Loader>}
      <Image
        src={src}
        alt={alt}
        onLoad={handleLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </Container>
  );
};
