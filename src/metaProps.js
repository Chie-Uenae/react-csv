import React from 'react';
import { string, array, oneOfType, bool, func, arrayOf,shape } from 'prop-types';

export const propTypes = {
	csvList: arrayOf(shape({
		data: oneOfType([string, array, func]).isRequired,
		headers: array,
		separator: string,
		enclosingCharacter: string,
		isTranspose: bool,
		isIndent: bool,
		tableTitle: string
	})).isRequired,
	target: string,
	filename: string,
	uFEFF: bool,
	onClick: func,
	asyncOnClick: bool
};

export const defaultProps = {
	csvList: {
		enclosingCharacter: '"',
		isTranspose: false,
		isIndent: false,
		tableTitle: ''
	},
	filename: 'generatedBy_react-csv.csv',
	uFEFF: true,
	asyncOnClick: false,
	separator: ',',
	target: '_blank'
};

export const PropsNotForwarded = [
	`data`,
	`headers`
];
