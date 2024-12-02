import { Phone } from "../polymorphic/phone";

export interface storeSupplier {
    num_ruc:        number;
    business_name:  string;
    fiscal_address?: string;
    phone:          Phone[];
    contac?:         string;
}
