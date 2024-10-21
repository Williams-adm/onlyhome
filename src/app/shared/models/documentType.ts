export interface DocumentType {
    type?:   docType;
    number?: number;
}

export enum docType{
    'Dni' = "DNI",
    'Pasaporte' = "Pasaporte",
    'Carnet De Extranjeria' = "CARNET_EXT",
    'Ruc' = "RUC",
    'Otros' = "Otros"
}

