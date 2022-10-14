export default CSVDownload;
/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
declare class CSVDownload {
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
    state: {};
    buildURI(...args: any[]): string;
    buildMultiTableCSV(csvList: any): any;
    componentDidMount(): void;
    getWindow(): any;
    render(): null;
}
