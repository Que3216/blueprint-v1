"use strict";
/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var React = require("react");
var Classes = require("../../common/classes");
var utils_1 = require("../../common/utils");
var collapse_1 = require("../collapse/collapse");
var icon_1 = require("../icon/icon");
var TreeNode = (function (_super) {
    tslib_1.__extends(TreeNode, _super);
    function TreeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleCaretClick = function (e) {
            e.stopPropagation();
            var _a = _this.props, isExpanded = _a.isExpanded, onCollapse = _a.onCollapse, onExpand = _a.onExpand;
            utils_1.safeInvoke(isExpanded ? onCollapse : onExpand, _this, e);
        };
        _this.handleClick = function (e) {
            utils_1.safeInvoke(_this.props.onClick, _this, e);
        };
        _this.handleContentRef = function (element) {
            utils_1.safeInvoke(_this.props.contentRef, _this, element);
        };
        _this.handleContextMenu = function (e) {
            utils_1.safeInvoke(_this.props.onContextMenu, _this, e);
        };
        _this.handleDoubleClick = function (e) {
            utils_1.safeInvoke(_this.props.onDoubleClick, _this, e);
        };
        return _this;
    }
    TreeNode.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, hasCaret = _a.hasCaret, iconName = _a.iconName, isExpanded = _a.isExpanded, isSelected = _a.isSelected, label = _a.label;
        var showCaret = hasCaret == null ? React.Children.count(children) > 0 : hasCaret;
        var caretClass = showCaret ? Classes.TREE_NODE_CARET : Classes.TREE_NODE_CARET_NONE;
        var caretStateClass = isExpanded ? Classes.TREE_NODE_CARET_OPEN : Classes.TREE_NODE_CARET_CLOSED;
        var caretClasses = classNames(caretClass, Classes.ICON_STANDARD, (_b = {},
            _b[caretStateClass] = showCaret,
            _b));
        var classes = classNames(Classes.TREE_NODE, (_c = {},
            _c[Classes.TREE_NODE_SELECTED] = isSelected,
            _c[Classes.TREE_NODE_EXPANDED] = isExpanded,
            _c), className);
        var contentClasses = classNames(Classes.TREE_NODE_CONTENT, "pt-tree-node-content-" + this.props.depth);
        return (React.createElement("li", { className: classes },
            React.createElement("div", { className: contentClasses, onClick: this.handleClick, onContextMenu: this.handleContextMenu, onDoubleClick: this.handleDoubleClick, ref: this.handleContentRef },
                React.createElement("span", { className: caretClasses, onClick: showCaret ? this.handleCaretClick : null }),
                React.createElement(icon_1.Icon, { className: Classes.TREE_NODE_ICON, iconName: iconName }),
                React.createElement("span", { className: Classes.TREE_NODE_LABEL }, label),
                this.maybeRenderSecondaryLabel()),
            React.createElement(collapse_1.Collapse, { isOpen: isExpanded }, children)));
        var _b, _c;
    };
    TreeNode.prototype.maybeRenderSecondaryLabel = function () {
        if (this.props.secondaryLabel != null) {
            return React.createElement("span", { className: Classes.TREE_NODE_SECONDARY_LABEL }, this.props.secondaryLabel);
        }
        else {
            return undefined;
        }
    };
    return TreeNode;
}(React.Component));
exports.TreeNode = TreeNode;
