import * as moment from 'moment';

export interface ISignParamsData {
    encodeToBase64: boolean;
    contentEncoding: number;
    detached: boolean;
    encodingType: number;
    certificateIncludeOption: number;
    dateTime?: moment.Moment | string | number;
}

export class SignParams {
    constructor(
        public encodeToBase64: boolean,
        public contentEncoding: number,
        public detached: boolean,
        public encodingType: number,
        public certificateIncludeOption: number,
        public dateTime?: moment.Moment
    ) {}

    public static fromObject(data: ISignParamsData): SignParams {
        return new SignParams(
            data.encodeToBase64,
            data.contentEncoding,
            data.detached,
            data.encodingType,
            data.certificateIncludeOption,
            !!data.dateTime
                ? moment.utc(data.dateTime, 'YYYY-MM-DDTHH:mm:ss.SSSSSSS[Z]')
                : undefined
        );
    }

    getCadesDateTime(): string | undefined {
        return this.dateTime
            ? this.dateTime.format('YYMMDDHHmmss[Z]')
            : undefined;
    }
}
