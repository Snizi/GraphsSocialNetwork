"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const control_styles_1 = require("./control-styles");
const types_1 = require("./types");
const controlsMap = [
    { funcName: 'renderTopLeftControls', key: types_1.Positions.TopLeft },
    { funcName: 'renderTopCenterControls', key: types_1.Positions.TopCenter },
    { funcName: 'renderTopRightControls', key: types_1.Positions.TopRight },
    { funcName: 'renderCenterLeftControls', key: types_1.Positions.CenterLeft },
    { funcName: 'renderCenterCenterControls', key: types_1.Positions.CenterCenter },
    { funcName: 'renderCenterRightControls', key: types_1.Positions.CenterRight },
    { funcName: 'renderBottomLeftControls', key: types_1.Positions.BottomLeft },
    { funcName: 'renderBottomCenterControls', key: types_1.Positions.BottomCenter },
    { funcName: 'renderBottomRightControls', key: types_1.Positions.BottomRight }
];
const renderControls = (props, count, currentSlide, moveSlide, nextSlide, prevSlide, slidesToScroll) => {
    if (props.withoutControls) {
        return null;
    }
    return controlsMap.map((control) => {
        var _a;
        if (!props[control.funcName] ||
            typeof props[control.funcName] !== 'function') {
            return (0, jsx_runtime_1.jsx)(react_1.Fragment, {}, control.funcName);
        }
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: Object.assign(Object.assign({}, (0, control_styles_1.getControlContainerStyles)(control.key)), { pointerEvents: 'none' }) }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: [
                    `slider-control-${control.key.toLowerCase()}`,
                    props.defaultControlsConfig.containerClassName || ''
                ]
                    .join(' ')
                    .trim(), 
                // The container has `pointerEvents: 'none'` so we need to override
                // that to make sure the controls are clickable.
                style: { pointerEvents: 'auto' } }, { children: (_a = props[control.funcName]) === null || _a === void 0 ? void 0 : _a.call(props, {
                    cellAlign: props.cellAlign,
                    cellSpacing: props.cellSpacing,
                    currentSlide,
                    defaultControlsConfig: props.defaultControlsConfig || {},
                    goToSlide: (index) => moveSlide(index),
                    nextSlide: () => nextSlide(),
                    previousSlide: () => prevSlide(),
                    scrollMode: props.scrollMode,
                    slideCount: count,
                    slidesToScroll,
                    slidesToShow: props.slidesToShow || 1,
                    vertical: props.vertical,
                    wrapAround: props.wrapAround
                }) })) }), control.funcName));
    });
};
exports.default = renderControls;
//# sourceMappingURL=controls.js.map