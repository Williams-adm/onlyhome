import { Address } from "./adress";
import { DocumentType } from "./documentType";
import { EmployeeDocument } from "./employeeDocument";
import { Phone } from "./phone";
import { User } from "./user";

export interface storeEmployee {
    name?:               string;
    paternal_surname?:   string;
    maternal_surname?:   string;
    date_of_birth?:      Date;
    salary?:             number;
    payment_date?:       PaymentDate;
    document_types?:     DocumentType[];
    phones?:             Phone[];
    addresses?:          Address [];
    user?:               UserData;
    employee_documents?: EmployeeDocument[];
}

export enum PaymentDate{
    'Fin De Mes' = "fin_de_mes",
    'Quincenal' = "Quincenal",
    'Semanal' = "Semanal",
}

export interface UserData extends User {
    status?: number;
    password?: string;
}