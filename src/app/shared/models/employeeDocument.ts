export interface EmployeeDocument {
    document_type?: employDoc;
    document_path?: string;
}

export enum employDoc{
    'Cv' = "Cv",
    'Copia De Identificación' = "Copia de di",
    'Otros' = "Otros",
}