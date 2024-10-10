export interface gEmployees {
    data:  Datum[];
    links: Links;
    meta:  Meta;
}

export interface Datum {
    id:                number;
    full_name:         string;
    user:              User;
    photo:             string;
    registration_date: string;
}

export interface User {
    id:     number;
    email:  string;
    status: number;
}

export interface Links {
    first: string;
    last:  string;
    prev:  null | string;
    next:  null | string;
}

export interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        Link[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}