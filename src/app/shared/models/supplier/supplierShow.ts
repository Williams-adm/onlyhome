import { Phone } from "../polymorphic/phone";

export interface showSupplier {
    data: Data;
}

export interface Data {
    id:             number;
    num_ruc:        string;
    business_name:  string;
    fiscal_address: string;
    phones:         Phone[];
    contac:         string;
}