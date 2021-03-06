/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
var ControlGroup = (function (_super) {
    tslib_1.__extends(ControlGroup, _super);
    function ControlGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlGroup.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, fill = _a.fill, vertical = _a.vertical, htmlProps = tslib_1.__rest(_a, ["children", "className", "fill", "vertical"]);
        var rootClasses = classNames(Classes.CONTROL_GROUP, (_b = {},
            _b[Classes.FILL] = fill,
            _b[Classes.VERTICAL] = vertical,
            _b), className);
        return (React.createElement("div", tslib_1.__assign({}, htmlProps, { className: rootClasses }), children));
        var _b;
    };
    ControlGroup.displayName = "Blueprint.ControlGroup";
    ControlGroup = tslib_1.__decorate([
        PureRender
    ], ControlGroup);
    return ControlGroup;
}(React.Component));
export { ControlGroup };
export var ControlGroupFactory = React.createFactory(ControlGroup);
