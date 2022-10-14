export namespace propTypes {
    export const csvList: any;
    export { string as target };
    export { string as filename };
    export { bool as uFEFF };
    export { func as onClick };
    export { bool as asyncOnClick };
}
export namespace defaultProps {
    export namespace csvList_1 {
        export const enclosingCharacter: string;
        export const isTranspose: boolean;
        export const isIndent: boolean;
        export const tableTitle: string;
    }
    export { csvList_1 as csvList };
    export const filename: string;
    export const uFEFF: boolean;
    export const asyncOnClick: boolean;
    export const separator: string;
    export const target: string;
}
export const PropsNotForwarded: string[];
