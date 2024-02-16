export interface IData {
    title? : string;
    id? : string ;
    uid? : string;
    가격? : string;
    이미지? : string[];
    올린사람? : string;
    상품명? : string;
    지역? : string;
    세부지역?: string
    날짜? : string;
    상태? : string;
    product? : IData;
    설명? : string;
    조회수? : number;
}