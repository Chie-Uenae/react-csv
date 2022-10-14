var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { buildURI, toCSV } from '../core';
import { defaultProps as commonDefaultProps, propTypes as commonPropTypes } from '../metaProps';
var ExpandedLink = /** @class */ (function (_super) {
    __extends(ExpandedLink, _super);
    function ExpandedLink(props) {
        var _this = _super.call(this, props) || this;
        _this.buildURI = _this.buildURI.bind(_this);
        _this.buildMultiTableCSV = _this.buildMultiTableCSV.bind(_this);
        return _this;
    }
    ExpandedLink.prototype.buildURI = function () {
        return buildURI.apply(void 0, arguments);
    };
    ExpandedLink.prototype.buildMultiTableCSV = function (csvList, isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        var multiCsv = csvList.map(function (csv) {
            var csvData = isAsync && typeof csvList.data === 'function' ? csv.data() : csv.data;
            return toCSV(csvData, csv.headers, csv.separator, csv.enclosingCharacter, csv.isTranspose, csv.isIndent, csv.tableTitle);
        }).join('\n');
        return multiCsv;
    };
    /**
     * In IE11 this method will trigger the file download
    */
    ExpandedLink.prototype.handleLegacy = function (event, isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        // If this browser is IE 11, it does not support the `download` attribute
        if (window.navigator.msSaveOrOpenBlob) {
            // Stop the click propagation
            event.preventDefault();
            var _a = this.props, csvList = _a.csvList, filename = _a.filename, uFEFF = _a.uFEFF;
            var blob = new Blob([uFEFF ? '\uFEFF' : '', this.buildMultiTableCSV(csvList, isAsync)]);
            window.navigator.msSaveBlob(blob, filename);
            return false;
        }
    };
    ExpandedLink.prototype.handleAsyncClick = function (event) {
        var _this = this;
        var done = function (proceed) {
            if (proceed === false) {
                event.preventDefault();
                return;
            }
            _this.handleLegacy(event, true);
        };
        this.props.onClick(event, done);
    };
    ExpandedLink.prototype.handleSyncClick = function (event) {
        var stopEvent = this.props.onClick(event) === false;
        if (stopEvent) {
            event.preventDefault();
            return;
        }
        this.handleLegacy(event);
    };
    ExpandedLink.prototype.handleClick = function () {
        var _this = this;
        return function (event) {
            if (typeof _this.props.onClick === 'function') {
                return _this.props.asyncOnClick
                    ? _this.handleAsyncClick(event)
                    : _this.handleSyncClick(event);
            }
            _this.handleLegacy(event);
        };
    };
    ExpandedLink.prototype.render = function () {
        var _this = this;
        var _a = this.props, csvList = _a.csvList, filename = _a.filename, uFEFF = _a.uFEFF, children = _a.children, onClick = _a.onClick, asyncOnClick = _a.asyncOnClick, rest = __rest(_a, ["csvList", "filename", "uFEFF", "children", "onClick", "asyncOnClick"]);
        var isNodeEnvironment = typeof window === 'undefined';
        var href = isNodeEnvironment ? '' : this.buildURI(this.buildMultiTableCSV(csvList), uFEFF);
        return (React.createElement("a", __assign({ download: filename }, rest, { ref: function (link) { return (_this.link = link); }, target: "_self", href: href, onClick: this.handleClick() }), children));
    };
    ExpandedLink.defaultProps = commonDefaultProps;
    ExpandedLink.propTypes = commonPropTypes;
    return ExpandedLink;
}(React.Component));
export default ExpandedLink;
