"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrevMoveIndex = exports.getNextMoveIndex = exports.removeEvent = exports.addEvent = exports.getIndexes = void 0;
const types_1 = require("./types");
const getIndexes = (slide, endSlide, count) => {
    let slideIndex = slide;
    let endSlideIndex = endSlide;
    if (slideIndex < 0) {
        slideIndex += count;
    }
    else if (slideIndex > count - 1) {
        slideIndex -= count;
    }
    if (endSlideIndex < 0) {
        endSlideIndex += count;
    }
    else if (endSlideIndex > count - 1) {
        endSlideIndex -= count;
    }
    return [slideIndex, endSlideIndex];
};
exports.getIndexes = getIndexes;
const addEvent = (elem, type, eventHandler) => {
    if (elem === null || typeof elem === 'undefined') {
        return;
    }
    if (elem.addEventListener) {
        elem.addEventListener(type, eventHandler, false);
    }
};
exports.addEvent = addEvent;
const removeEvent = (elem, type, eventHandler) => {
    if (elem === null || typeof elem === 'undefined') {
        return;
    }
    if (elem.removeEventListener) {
        elem.removeEventListener(type, eventHandler, false);
    }
};
exports.removeEvent = removeEvent;
const getNextMoveIndex = (scrollMode, wrapAround, currentSlide, count, slidesToScroll, slidesToShow) => {
    if (!wrapAround &&
        scrollMode === types_1.ScrollMode.remainder &&
        count < currentSlide + (slidesToScroll + slidesToShow)) {
        const remindedSlides = count - (currentSlide + slidesToScroll) - (slidesToShow - slidesToScroll);
        return currentSlide + remindedSlides;
    }
    return currentSlide + slidesToScroll;
};
exports.getNextMoveIndex = getNextMoveIndex;
const getPrevMoveIndex = (scrollMode, wrapAround, currentSlide, slidesToScroll) => {
    if (!wrapAround &&
        scrollMode === types_1.ScrollMode.remainder &&
        currentSlide - slidesToScroll < 0) {
        return 0;
    }
    return currentSlide - slidesToScroll;
};
exports.getPrevMoveIndex = getPrevMoveIndex;
//# sourceMappingURL=utils.js.map