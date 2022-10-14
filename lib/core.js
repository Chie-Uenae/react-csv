/**
 * Simple safari detection based on user agent test
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export var isSafari = function () { return /^((?!chrome|android).)*safari/i.test(navigator.userAgent); };
export var isJsons = (function (array) { return Array.isArray(array) && array.every(function (row) { return (typeof row === 'object' && !(row instanceof Array)); }); });
export var isArrays = (function (array) { return Array.isArray(array) && array.every(function (row) { return Array.isArray(row); }); });
export var jsonsHeaders = (function (array) { return Array.from(array.map(function (json) { return Object.keys(json); })
    .reduce(function (a, b) { return new Set(__spreadArrays(a, b)); }, [])); });
export var jsons2arrays = function (jsons, headers) {
    headers = headers || jsonsHeaders(jsons);
    // allow headers to have custom labels, defaulting to having the header data key be the label
    var headerLabels = headers;
    var headerKeys = headers;
    if (isJsons(headers)) {
        headerLabels = headers.map(function (header) { return header.label; });
        headerKeys = headers.map(function (header) { return header.key; });
    }
    var data = jsons.map(function (object) { return headerKeys.map(function (header) { return getHeaderValue(header, object); }); });
    return __spreadArrays([headerLabels], data);
};
export var getHeaderValue = function (property, obj) {
    var foundValue = property
        .replace(/\[([^\]]+)]/g, ".$1")
        .split(".")
        .reduce(function (o, p, i, arr) {
        // if at any point the nested keys passed do not exist, splice the array so it doesnt keep reducing
        var value = o[p];
        if (value === undefined || value === null) {
            arr.splice(1);
        }
        else {
            return value;
        }
    }, obj);
    // if at any point the nested keys passed do not exist then looks for key `property` in object obj
    return (foundValue === undefined) ? ((property in obj) ? obj[property] : '') : foundValue;
};
export var elementOrEmpty = function (element) {
    return (typeof element === 'undefined' || element === null) ? '' : element;
};
export var joiner = (function (data, separator, enclosingCharacter, isTranspose, isIndent) {
    if (separator === void 0) { separator = ','; }
    if (enclosingCharacter === void 0) { enclosingCharacter = '"'; }
    if (isTranspose) {
        return data[0]
            .filter(function (e) { return e; })
            .map(function (label, index) {
            var col = data.map(function (row) {
                return "" + enclosingCharacter + row[index] + enclosingCharacter;
            })
                .join(separator);
            return isIndent ? "" + enclosingCharacter + enclosingCharacter + separator + col : col;
        })
            .join("\n");
    }
    return data
        .filter(function (e) { return e; })
        .map(function (row) {
        if (isIndent)
            row.unshift('');
        return row
            .map(function (element) { return elementOrEmpty(element); })
            .map(function (column) { return "" + enclosingCharacter + column + enclosingCharacter; })
            .join(separator);
    })
        .join("\n");
});
export var arrays2csv = (function (data, headers, separator, enclosingCharacter, isTranspose, isIndent) {
    return joiner(headers ? __spreadArrays([headers], data) : data, separator, enclosingCharacter, isTranspose, isIndent);
});
export var jsons2csv = (function (data, headers, separator, enclosingCharacter, isTranspose, isIndent) {
    return joiner(jsons2arrays(data, headers), separator, enclosingCharacter, isTranspose, isIndent);
});
export var string2csv = function (data, headers, separator, isTranspose, isIndent) {
    //TODO：転置対応、インデント対応
    return headers ? headers.join(separator) + "\n" + data : data.replace(/"/g, '""');
};
export var toCSV = function (data, headers, separator, enclosingCharacter, isTranspose, isIndent, tableTitle) {
    var title = elementOrEmpty(tableTitle) != '' ? tableTitle + "\n" : '';
    if (isJsons(data))
        return title + jsons2csv(data, headers, separator, enclosingCharacter, isTranspose, isIndent);
    if (isArrays(data))
        return title + arrays2csv(data, headers, separator, enclosingCharacter, isTranspose, isIndent);
    if (typeof data === 'string')
        return title + string2csv(data, headers, separator, isTranspose, isIndent);
    throw new TypeError("Data should be a \"String\", \"Array of arrays\" OR \"Array of objects\" ");
};
export var buildURI = (function (csvList, uFEFF) {
    var type = isSafari() ? 'application/csv' : 'text/csv';
    var blob = new Blob([uFEFF ? '\uFEFF' : '', csvList], { type: type });
    var dataURI = "data:" + type + ";charset=utf-8," + (uFEFF ? '\uFEFF' : '') + csvList;
    var URL = window.URL || window.webkitURL;
    return (typeof URL.createObjectURL === 'undefined')
        ? dataURI
        : URL.createObjectURL(blob);
});
