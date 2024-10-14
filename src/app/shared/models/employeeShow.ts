export interface showEmployee {
    data: Data;
}

export interface Data {
    id:             number;
    name:           string;
    last_name:      string;
    date_of_birth:  string;
    salary:         string;
    payment_date:   string;
    photo_path:     string;
    document_types: DocumentType[];
    phones:         Phone[];
    address:        Address[];
    user:           User;
    documents:      Document[];
}

export interface Address {
    id: number;
    country: string;
    region: string;
    province:         string;
    city:             string;
    street:           string;
    addressable_id:   number;
    addressable_type: string;
}

export interface DocumentType {
    id:     number;
    type:   string;
    number: string;
}

export interface Document {
    id:            number;
    document_type: string;
    document_path: string;
}

export interface Phone {
    id:             number;
    number:         string;
    phoneable_id:   number;
    phoneable_type: string;
}

export interface User {
    id:    number;
    email: string;
}