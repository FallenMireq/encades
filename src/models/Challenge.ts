export interface IChallengeData {
    data: string;
}

export class Challenge {
    constructor(public data: string) {}

    public static fromObject(data: IChallengeData): Challenge {
        return new Challenge(data.data);
    }
}
