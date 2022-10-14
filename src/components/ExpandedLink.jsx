import React from 'react';
import { buildURI, toCSV } from '../core';
import {
  defaultProps as commonDefaultProps,
  propTypes as commonPropTypes
} from '../metaProps';

class ExpandedLink extends React.Component {
	static defaultProps = commonDefaultProps;
	static propTypes = commonPropTypes;

	constructor(props) {
		super(props);
		this.buildURI = this.buildURI.bind(this);
		this.buildMultiTableCSV = this.buildMultiTableCSV.bind(this);
	}
	buildURI() {
		return buildURI(...arguments);
	}

	buildMultiTableCSV(csvList, isAsync = false){
		let multiCsv = csvList.map((csv)=>{
			let csvData = isAsync && typeof csvList.data === 'function' ? csv.data() : csv.data;

			return toCSV(csvData, csv.headers, csv.separator, csv.enclosingCharacter, csv.isTranspose, csv.isIndent, csv.tableTitle)
		}).join('\n')

		return multiCsv
	}

	/**
	 * In IE11 this method will trigger the file download
	*/
	handleLegacy(event, isAsync = false) {
		// If this browser is IE 11, it does not support the `download` attribute
		if (window.navigator.msSaveOrOpenBlob) {
			// Stop the click propagation
			event.preventDefault();

			const {
				csvList,
				filename,
				uFEFF
			} = this.props;

			let blob = new Blob([uFEFF ? '\uFEFF' : '', this.buildMultiTableCSV(csvList, isAsync)]);
			window.navigator.msSaveBlob(blob, filename);

			return false;
		}
	}

	handleAsyncClick(event) {
		const done = proceed => {
			if (proceed === false) {
				event.preventDefault();
				return;
			}
			this.handleLegacy(event, true);
		};

		this.props.onClick(event, done);
	}

	handleSyncClick(event) {
		const stopEvent = this.props.onClick(event) === false;
		if (stopEvent) {
			event.preventDefault();
			return;
		}
		this.handleLegacy(event);
	}

	handleClick() {
		return event => {
			if (typeof this.props.onClick === 'function') {
				return this.props.asyncOnClick
					? this.handleAsyncClick(event)
					: this.handleSyncClick(event);
			}
			this.handleLegacy(event);
		};
	  }

	render() {
		const {
			csvList,
			filename,
			uFEFF,
			children,
			onClick,
			asyncOnClick,
			...rest
		} = this.props;

		const isNodeEnvironment = typeof window === 'undefined';
		const href = isNodeEnvironment ? '' : this.buildURI(this.buildMultiTableCSV(csvList), uFEFF)

		return (
			<a
			download={filename}
			{...rest}
			ref={link => (this.link = link)}
			target="_self"
			href={href}
			onClick={this.handleClick()}
			>
			{children}
			</a>
		);
	}

}
export default ExpandedLink;