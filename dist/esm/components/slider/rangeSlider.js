/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { isFunction } from "../../common/utils";
import { CoreSlider } from "./coreSlider";
import { Handle } from "./handle";
var RangeIndex;
(function (RangeIndex) {
    RangeIndex[RangeIndex["START"] = 0] = "START";
    RangeIndex[RangeIndex["END"] = 1] = "END";
})(RangeIndex || (RangeIndex = {}));
var RangeSlider = (function (_super) {
    tslib_1.__extends(RangeSlider, _super);
    function RangeSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.className = classNames(Classes.SLIDER, Classes.RANGE_SLIDER);
        _this.handles = [];
        _this.addHandleRef = function (ref) {
            if (ref != null) {
                _this.handles.push(ref);
            }
        };
        _this.getHandlerForIndex = function (index, callback) { return function (newValue) {
            if (isFunction(callback)) {
                var _a = _this.props.value, startValue = _a[0], endValue = _a[1];
                if (index === RangeIndex.START) {
                    callback([Math.min(newValue, endValue), endValue]);
                }
                else {
                    callback([startValue, Math.max(newValue, startValue)]);
                }
            }
        }; };
        _this.handleChange = function (newValue) {
            var _a = _this.props.value, startValue = _a[0], endValue = _a[1];
            var newStartValue = newValue[0], newEndValue = newValue[1];
            if ((startValue !== newStartValue || endValue !== newEndValue) && isFunction(_this.props.onChange)) {
                _this.props.onChange(newValue);
            }
        };
        return _this;
    }
    RangeSlider.prototype.renderFill = function () {
        var tickSize = this.state.tickSize;
        var _a = this.props.value, startValue = _a[0], endValue = _a[1];
        if (startValue === endValue) {
            return undefined;
        }
        // expand by 1px in each direction so it sits under the handle border
        var offset = Math.round((startValue - this.props.min) * tickSize) - 1;
        var size = Math.round((endValue - startValue) * tickSize) + 2;
        if (size < 0) {
            offset += size;
            size = Math.abs(size);
        }
        var style = this.props.vertical
            ? { bottom: offset, height: size }
            : { left: offset, width: size };
        return React.createElement("div", { className: Classes.SLIDER + "-progress", style: style });
    };
    RangeSlider.prototype.renderHandles = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, max = _a.max, min = _a.min, onRelease = _a.onRelease, stepSize = _a.stepSize, value = _a.value, vertical = _a.vertical;
        return value.map(function (val, index) { return (React.createElement(Handle, { disabled: disabled, key: index, label: _this.formatLabel(val), max: max, min: min, onChange: _this.getHandlerForIndex(index, _this.handleChange), onRelease: _this.getHandlerForIndex(index, onRelease), ref: _this.addHandleRef, stepSize: stepSize, tickSize: _this.state.tickSize, value: val, vertical: vertical })); });
    };
    RangeSlider.prototype.handleTrackClick = function (event) {
        var _this = this;
        this.handles
            .reduce(function (min, handle) {
            // find closest handle to the mouse position
            var offset = handle.mouseEventClientOffset(event);
            var value = handle.clientToValue(offset);
            return _this.nearestHandleForValue(value, min, handle);
        })
            .beginHandleMovement(event);
    };
    RangeSlider.prototype.handleTrackTouch = function (event) {
        var _this = this;
        this.handles
            .reduce(function (min, handle) {
            // find closest handle to the touch position
            var value = handle.clientToValue(handle.touchEventClientOffset(event));
            return _this.nearestHandleForValue(value, min, handle);
        })
            .beginHandleTouchMovement(event);
    };
    RangeSlider.prototype.nearestHandleForValue = function (value, firstHandle, secondHandle) {
        var firstHandleValue = firstHandle.props.value;
        var firstDistance = Math.abs(value - firstHandleValue);
        var secondDistance = Math.abs(value - secondHandle.props.value);
        if (firstDistance < secondDistance) {
            return firstHandle;
        }
        else if (secondDistance < firstDistance) {
            return secondHandle;
        }
        else {
            // if the values are equal, return the handle that is *able* to move
            // in the necessary direction.
            return value < firstHandleValue ? firstHandle : secondHandle;
        }
    };
    RangeSlider.prototype.validateProps = function (props) {
        var value = props.value;
        if (value == null || value[RangeIndex.START] == null || value[RangeIndex.END] == null) {
            throw new Error(Errors.RANGESLIDER_NULL_VALUE);
        }
    };
    RangeSlider.defaultProps = {
        disabled: false,
        labelStepSize: 1,
        max: 10,
        min: 0,
        showTrackFill: true,
        stepSize: 1,
        value: [0, 10],
        vertical: false,
    };
    RangeSlider.displayName = "Blueprint.RangeSlider";
    return RangeSlider;
}(CoreSlider));
export { RangeSlider };
export var RangeSliderFactory = React.createFactory(RangeSlider);
