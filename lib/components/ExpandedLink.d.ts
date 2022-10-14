export default ExpandedLink;
declare class ExpandedLink {
    static defaultProps: {
        csvList: {
            enclosingCharacter: string;
            isTranspose: boolean;
            isIndent: boolean;
            tableTitle: string;
        };
        filename: string;
        uFEFF: boolean;
        asyncOnClick: boolean;
        separator: string;
        target: string;
    };
    static propTypes: {
        csvList: any;
        target: any;
        filename: any;
        uFEFF: any;
        onClick: any;
        asyncOnClick: any;
    };
    constructor(props: any);
    buildURI(...args: any[]): string;
    buildMultiTableCSV(csvList: any, isAsync?: boolean): any;
    /**
     * In IE11 this method will trigger the file download
    */
    handleLegacy(event: any, isAsync?: boolean): false | undefined;
    handleAsyncClick(event: any): void;
    handleSyncClick(event: any): void;
    handleClick(): (event: any) => void;
    render(): any;
    link: any;
}
