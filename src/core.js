/**
 * Simple safari detection based on user agent test
 */

export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isJsons = ((array) => Array.isArray(array) && array.every(
	row => (typeof row === 'object' && !(row instanceof Array))
));

export const isArrays = ((array) => Array.isArray(array) && array.every(
	row => Array.isArray(row)
));

export const jsonsHeaders = ((array) => Array.from(
	array.map(json => Object.keys(json))
		.reduce((a, b) => new Set([...a, ...b]), [])
));

export const jsons2arrays = (jsons, headers) => {
	headers = headers || jsonsHeaders(jsons);

	// allow headers to have custom labels, defaulting to having the header data key be the label
	let headerLabels = headers;
	let headerKeys = headers;
	if (isJsons(headers)) {
		headerLabels = headers.map((header) => header.label);
		headerKeys = headers.map((header) => header.key);
	}

	const data = jsons.map((object) => headerKeys.map((header) => getHeaderValue(header, object)));
	return [headerLabels, ...data];
};

export const getHeaderValue = (property, obj) => {
	const foundValue = property
		.replace(/\[([^\]]+)]/g, ".$1")
		.split(".")
		.reduce(function (o, p, i, arr) {
			// if at any point the nested keys passed do not exist, splice the array so it doesnt keep reducing
			const value = o[p];
			if (value === undefined || value === null) {
				arr.splice(1);
			} else {
				return value;
			}
		}, obj);
	// if at any point the nested keys passed do not exist then looks for key `property` in object obj
	return (foundValue === undefined) ? ((property in obj) ? obj[property] : '') : foundValue;
}

export const elementOrEmpty = (element) =>
	(typeof element === 'undefined' || element === null) ? '' : element;

export const joiner = ((data, separator = ',', enclosingCharacter = '"', isTranspose, isIndent) => {
	if(isTranspose){
		return data[0]
			.filter(e => e)
			.map((label, index) =>{
				let col =
					data.map((row) => {
						return `${enclosingCharacter}${row[index]}${enclosingCharacter}`
					})
					.join(separator)
				return isIndent ? `${enclosingCharacter}${enclosingCharacter}`+ separator + col : col
			})
			.join(`\n`);
	}
	return data
		.filter(e => e)
		.map((row) => {
			if(isIndent) row.unshift('')
			return row
			.map((element) => elementOrEmpty(element))
			.map(column => `${enclosingCharacter}${column}${enclosingCharacter}`)
			.join(separator)
		})
		.join(`\n`);
});

export const arrays2csv = ((data, headers, separator, enclosingCharacter, isTranspose, isIndent) =>
	joiner(headers ? [headers, ...data] : data, separator, enclosingCharacter, isTranspose, isIndent)
);

export const jsons2csv = ((data, headers, separator, enclosingCharacter, isTranspose, isIndent) =>
	joiner(jsons2arrays(data, headers), separator, enclosingCharacter, isTranspose, isIndent)
);

export const string2csv = (data, headers, separator, isTranspose, isIndent) =>{
	//TODO：転置対応、インデント対応
	return headers ? `${headers.join(separator)}\n${data}` : data.replace(/"/g, '""');
}

export const toCSV = (data, headers, separator, enclosingCharacter, isTranspose, isIndent, tableTitle) => {
	let title = elementOrEmpty(tableTitle) != '' ? tableTitle + `\n` : ''
	if (isJsons(data)) return title + jsons2csv(data, headers, separator, enclosingCharacter, isTranspose, isIndent);
	if (isArrays(data)) return title + arrays2csv(data, headers, separator, enclosingCharacter, isTranspose, isIndent);
	if (typeof data === 'string') return  title + string2csv(data, headers, separator, isTranspose, isIndent);
	throw new TypeError(`Data should be a "String", "Array of arrays" OR "Array of objects" `);
};

export const buildURI = ((csvList, uFEFF) => {
	const type = isSafari() ? 'application/csv' : 'text/csv';
	const blob = new Blob([uFEFF ? '\uFEFF' : '', csvList], { type });
	const dataURI = `data:${type};charset=utf-8,${uFEFF ? '\uFEFF' : ''}${csvList}`;

	const URL = window.URL || window.webkitURL;

	return (typeof URL.createObjectURL === 'undefined')
		? dataURI
		: URL.createObjectURL(blob);
});
