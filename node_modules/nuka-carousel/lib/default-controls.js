"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingDots = exports.getDotIndexes = exports.NextButton = exports.nextButtonDisabled = exports.PreviousButton = exports.prevButtonDisabled = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable complexity */
const react_1 = require("react");
const types_1 = require("./types");
const defaultButtonStyles = (disabled) => ({
    border: 0,
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: 10,
    textTransform: 'uppercase',
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
});
const prevButtonDisabled = ({ currentSlide, slideCount, slidesToShow, wrapAround }) => {
    // inifite carousel with visible slides that are less than all slides
    if (wrapAround && slidesToShow < slideCount) {
        return false;
    }
    // inifite carousel with visible slide equal or less than all slides
    if (wrapAround) {
        return false;
    }
    // if the first slide is not visible return false (button is not disabled)
    if (currentSlide !== 0) {
        return false;
    }
    return true;
};
exports.prevButtonDisabled = prevButtonDisabled;
const PreviousButton = (props) => {
    const handleClick = (event) => {
        event.preventDefault();
        props === null || props === void 0 ? void 0 : props.previousSlide();
    };
    const { prevButtonClassName, prevButtonStyle = {}, prevButtonText } = props.defaultControlsConfig || {};
    const disabled = (0, exports.prevButtonDisabled)(props);
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: prevButtonClassName, style: Object.assign(Object.assign({}, defaultButtonStyles(disabled)), prevButtonStyle), disabled: disabled, onClick: handleClick, "aria-label": "previous", type: "button" }, { children: prevButtonText || 'Prev' })));
};
exports.PreviousButton = PreviousButton;
const nextButtonDisabled = ({ currentSlide, slideCount, slidesToShow, slidesToScroll, wrapAround, scrollMode }) => {
    // remainder scroll mode
    if (!wrapAround &&
        scrollMode === types_1.ScrollMode.remainder &&
        currentSlide >= slideCount - slidesToShow) {
        return true;
    }
    // inifite carousel with visible slides that are less than all slides
    if (wrapAround && slidesToShow < slideCount) {
        return false;
    }
    // inifite carousel with visible slide equal or less than all slides
    if (wrapAround) {
        return false;
    }
    // if the last slide is not visible return false (button is not disabled)
    if (currentSlide < slideCount - slidesToScroll) {
        return false;
    }
    return true;
};
exports.nextButtonDisabled = nextButtonDisabled;
const NextButton = (props) => {
    const handleClick = (event) => {
        event.preventDefault();
        props.nextSlide();
    };
    const { defaultControlsConfig } = props;
    const { nextButtonClassName, nextButtonStyle = {}, nextButtonText } = defaultControlsConfig;
    const disabled = (0, exports.nextButtonDisabled)(props);
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: nextButtonClassName, style: Object.assign(Object.assign({}, defaultButtonStyles(disabled)), nextButtonStyle), disabled: disabled, onClick: handleClick, "aria-label": "next", type: "button" }, { children: nextButtonText || 'Next' })));
};
exports.NextButton = NextButton;
const getDotIndexes = (slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround) => {
    const dotIndexes = [];
    const scrollSlides = slidesToScroll === 0 ? 1 : slidesToScroll;
    for (let i = 0; i < slideCount; i += scrollSlides) {
        if (!(!wrapAround &&
            scrollMode === types_1.ScrollMode.remainder &&
            i > slideCount - slidesToShow)) {
            dotIndexes.push(i);
        }
    }
    // check if the slidesToShow is float value, if true add the last dot (remainder scroll mode)
    if (!wrapAround &&
        scrollMode === types_1.ScrollMode.remainder &&
        slidesToShow % 1 !== 0) {
        const lastIndex = dotIndexes[dotIndexes.length - 1];
        dotIndexes.push(lastIndex + (slidesToShow % 1));
    }
    return dotIndexes;
};
exports.getDotIndexes = getDotIndexes;
const PagingDots = (props) => {
    const listStyles = {
        position: 'relative',
        top: -10,
        display: 'flex',
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    };
    const getButtonStyles = (0, react_1.useCallback)((active) => ({
        cursor: 'pointer',
        opacity: active ? 1 : 0.5,
        background: 'transparent',
        border: 'none',
        fill: 'black'
    }), []);
    const indexes = (0, react_1.useMemo)(() => (0, exports.getDotIndexes)(props.slideCount, props.slidesToScroll, props.scrollMode, props.slidesToShow, props.wrapAround), [
        props.slideCount,
        props.slidesToScroll,
        props.scrollMode,
        props.slidesToShow,
        props.wrapAround
    ]);
    const { pagingDotsContainerClassName, pagingDotsClassName, pagingDotsStyle = {} } = props.defaultControlsConfig;
    return ((0, jsx_runtime_1.jsx)("ul", Object.assign({ className: pagingDotsContainerClassName, style: listStyles }, { children: indexes.map((index, i) => {
            let isActive = props.currentSlide === index ||
                props.currentSlide - props.slideCount === index ||
                props.currentSlide + props.slideCount === index;
            // the below condition checks and sets navigation dots active if the current slide falls in the current index range
            if (props.currentSlide < index && props.currentSlide > indexes[i - 1]) {
                isActive = true;
            }
            return ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: isActive ? 'paging-item active' : 'paging-item' }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: pagingDotsClassName, type: "button", style: Object.assign(Object.assign({}, getButtonStyles(isActive)), pagingDotsStyle), onClick: props.goToSlide.bind(null, index), "aria-label": `slide ${index + 1} bullet`, "aria-selected": isActive }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "paging-dot", width: "6", height: "6", "aria-hidden": "true", focusable: "false" }, { children: (0, jsx_runtime_1.jsx)("circle", { cx: "3", cy: "3", r: "3" }) })) })) }), index));
        }) })));
};
exports.PagingDots = PagingDots;
//# sourceMappingURL=default-controls.js.map