import { Phone } from "../polymorphic/phone";

export interface updateSupplier {
    num_ruc?:        number;
    business_name?:  string;
    fiscal_address?: string;
    phone?:          Phone[];
    contac?:         string;
}

export interface updateSupplierStatus {
    status: number;
}