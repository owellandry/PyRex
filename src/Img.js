"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
const Loader = styled_components_1.default.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #333;
`;
const Image = styled_components_1.default.img `
  width: 100%;
  height: 100%;
  display: block;
`;
const Img = ({ width, height, alt, src, loader }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const handleLoad = () => {
        setIsLoading(false);
    };
    return (react_1.default.createElement(Container, { width: width, height: height },
        isLoading && react_1.default.createElement(Loader, null, loader || 'Loading...'),
        react_1.default.createElement(Image, { src: src, alt: alt, onLoad: handleLoad, style: { display: isLoading ? 'none' : 'block' } })));
};
exports.Img = Img;
