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
import React from 'react';
import { buildURI } from '../core';
import { defaultProps as commonDefaultProps, propTypes as commonPropTypes } from '../metaProps';
/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
var CSVDownload = /** @class */ (function (_super) {
    __extends(CSVDownload, _super);
    function CSVDownload(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    CSVDownload.prototype.buildURI = function () {
        return buildURI.apply(void 0, arguments);
    };
    CSVDownload.prototype.buildMultiTableCSV = function (csvList) {
        var multiCsv = csvList.map(function (csv) {
            return toCSV(csv.data, csv.headers, csv.separator, csv.enclosingCharacter, csv.isTranspose, csv.isIndent, csv.tableTitle);
        }).join('\n');
        console.log(multiCsv);
        return multiCsv;
    };
    CSVDownload.prototype.componentDidMount = function () {
        var _a = this.props, csvList = _a.csvList, uFEFF = _a.uFEFF, target = _a.target, specs = _a.specs, replace = _a.replace;
        this.state.page = window.open(this.buildURI(buildMultiTableCSV(csvList), uFEFF), target, specs, replace);
    };
    CSVDownload.prototype.getWindow = function () {
        return this.state.page;
    };
    CSVDownload.prototype.render = function () {
        return (null);
    };
    CSVDownload.defaultProps = commonDefaultProps;
    CSVDownload.propTypes = commonPropTypes;
    return CSVDownload;
}(React.Component));
export default CSVDownload;
