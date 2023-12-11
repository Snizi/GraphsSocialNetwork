"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSliderListStyles = void 0;
const react_1 = __importDefault(require("react"));
const types_1 = require("./types");
const getSliderListWidth = (count, slidesToShow, wrapAround) => {
    const visibleSlides = slidesToShow || 1;
    if (wrapAround) {
        const percentage = (count * 100) / visibleSlides;
        return `${3 * percentage}%`;
    }
    const percentage = (count * 100) / visibleSlides;
    return `${percentage}%`;
};
const getTransition = (count, initialValue, currentSlide, cellAlign, wrapAround) => {
    if (cellAlign === types_1.Alignment.Left) {
        if (wrapAround) {
            const slideTransition = 100 / (3 * count);
            const currentTransition = initialValue - slideTransition * (currentSlide - 1);
            return currentTransition - slideTransition;
        }
        const slideTransition = (100 / count) * currentSlide;
        return -(slideTransition + initialValue);
    }
    else if (cellAlign === types_1.Alignment.Center) {
        if (wrapAround) {
            const slideTransition = 100 / (3 * count);
            const currentTransition = initialValue - slideTransition * (currentSlide - 1);
            return currentTransition - slideTransition;
        }
        const slideTransition = (100 / count) * currentSlide;
        return initialValue - slideTransition;
    }
    else if (cellAlign === types_1.Alignment.Right) {
        if (wrapAround) {
            const slideTransition = 100 / (3 * count);
            const currentTransition = initialValue - slideTransition * (currentSlide - 1);
            return currentTransition - slideTransition;
        }
        const slideTransition = (100 / count) * currentSlide;
        return initialValue - slideTransition;
    }
    return initialValue;
};
const getPositioning = (cellAlign, slidesToShow, count, currentSlide, wrapAround, move) => {
    // When wrapAround is enabled, we show the slides 3 times
    const totalCount = wrapAround ? 3 * count : count;
    const slideSize = 100 / totalCount;
    let initialValue = wrapAround ? -count * slideSize : 0;
    if (cellAlign === types_1.Alignment.Right && slidesToShow > 1) {
        const excessSlides = slidesToShow - 1;
        initialValue += slideSize * excessSlides;
    }
    if (cellAlign === types_1.Alignment.Center && slidesToShow > 1) {
        const excessSlides = slidesToShow - 1;
        // Half of excess is on left and half is on right when centered
        const excessLeftSlides = excessSlides / 2;
        initialValue += slideSize * excessLeftSlides;
    }
    const horizontalMove = getTransition(count, initialValue, currentSlide, cellAlign, wrapAround);
    // Special-case this. It's better to return undefined rather than a
    // transform of 0 pixels since transforms can cause flickering in chrome.
    if (move === 0 && horizontalMove === 0) {
        return undefined;
    }
    const draggableMove = move
        ? `calc(${horizontalMove}% - ${move}px)`
        : `${horizontalMove}%`;
    return `translate3d(${draggableMove}, 0, 0)`;
};
const getSliderListStyles = (children, currentSlide, animation, slidesToShow, cellAlign, wrapAround, speed, move, slideAnimation) => {
    const count = react_1.default.Children.count(children);
    const width = getSliderListWidth(count, slidesToShow, wrapAround);
    const positioning = getPositioning(cellAlign || types_1.Alignment.Left, slidesToShow || 1, count, currentSlide, wrapAround, move);
    return {
        width,
        textAlign: 'left',
        transition: animation && slideAnimation !== 'fade'
            ? `${speed || 500}ms ease 0s`
            : undefined,
        transform: positioning,
        display: 'flex'
    };
};
exports.getSliderListStyles = getSliderListStyles;
//# sourceMappingURL=slider-list.js.map