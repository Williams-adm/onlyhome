export enum paymentDate{
    fin_de_mes = "Fin de mes",
    Quincenal = "Quincenal",
    Semanal = "Semanal",
}

export enum docType{
    Dni = "DNI",
    Pasaporte = "Pasaporte",
    CarnetExtrangeria = "CARNET_EXT",
    Ruc = "RUC",
    Otros = "Otros"
}

enum employDoc{
    Cv = "Cv",
    CopiaDeDi = "Copia de di",
    Otros = "Otros",
}

export interface storeEmployee {
    name?:               string;
    paternal_surname?:   string;
    maternal_surname?:   string;
    date_of_birth?:      Date;
    salary?:             number;
    payment_date?:       paymentDate;
    document_types?:     DocumentType[];
    phones?:             Phone[];
    addresses?:          Address[];
    user?:               User;
    employee_documents?: EmployeeDocument[];
}

export interface Address {
    province?: string;
    city?:     string;
    street?:   string;
    number?:   string;
}

export interface DocumentType {
    type?:   docType;
    number?: number;
}

export interface EmployeeDocument {
    document_type?: employDoc;
    document_path?: string;
}

export interface Phone {
    prefix?: string;
    number?: number;
}

export interface User {
    email?:    string;
    password?: string;
    status?: number
}
