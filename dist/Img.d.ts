import React from 'react';
interface ImgProps {
    width: number;
    height: number;
    alt: string;
    src: string;
    loader?: React.ReactNode;
}
export declare const Img: React.FC<ImgProps>;
export {};
