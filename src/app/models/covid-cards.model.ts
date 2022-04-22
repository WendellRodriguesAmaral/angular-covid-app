export interface CovidCards {
    uid: number;
    uf: string;
    state: string;
    cases: number;
    deaths: number;
    suspects: number;
    refuses: number;
    datetime: string;
    country:  string;
    confirmed:  number;
    recovered: number;
    updated_at: string;
}

export interface Content<T> {
    data: T;
}



