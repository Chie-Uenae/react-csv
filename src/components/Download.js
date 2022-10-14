import React from 'react';
import {buildURI} from '../core';
import {
	 defaultProps as commonDefaultProps,
	 propTypes as commonPropTypes} from '../metaProps';

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends React.Component {

	static defaultProps = commonDefaultProps;
	static propTypes = commonPropTypes;

	constructor(props) {
		super(props);
		this.state={};
	}

	buildURI() {
		return buildURI(...arguments);
	}

	buildMultiTableCSV(csvList){
		let multiCsv = csvList.map((csv)=>{
			return toCSV(csv.data, csv.headers, csv.separator, csv.enclosingCharacter, csv.isTranspose, csv.isIndent, csv.tableTitle)
		}).join('\n')

		console.log(multiCsv)
		return multiCsv
	}

	componentDidMount(){
		const {csvList, uFEFF, target, specs, replace} = this.props;
		this.state.page = window.open(
				this.buildURI(buildMultiTableCSV(csvList), uFEFF), target, specs, replace
		);
	}

	getWindow() {
		return this.state.page;
	}

	render(){
		return (null)
	}
}

export default CSVDownload;