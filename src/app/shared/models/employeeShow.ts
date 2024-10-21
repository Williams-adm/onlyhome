import { Address } from "./adress";
import { DocumentType } from "./documentType";
import { EmployeeDocument } from "./employeeDocument";
import { Phone } from "./phone";
import { User } from "./user";

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
    phones:         PhoneWithId[];
    address:        AddressWithId[];
    user:           UserData;
    documents:      EmployeeDocument[];
}
export interface AddressWithId extends Address {
    id: number;
}

export interface PhoneWithId extends Phone {
    id: number;
}

export interface UserData extends User {
    id: number;
}
