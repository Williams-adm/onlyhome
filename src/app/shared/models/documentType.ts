export interface DocumentType {
    type?:   docType;
    number?: number;
}

export enum docType{
    'DNI' = "DNI",
    'Pasaporte' = "Pasaporte",
    'Carnet De Extranjeria' = "CARNET_EXT",
    'RUC' = "RUC",
    'Otros' = "Otros"
}

