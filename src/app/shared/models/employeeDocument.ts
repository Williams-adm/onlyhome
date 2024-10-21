export interface EmployeeDocument {
    document_type?: employDoc;
    document_path?: string;
}

enum employDoc{
    Cv = "Cv",
    CopiaDeDi = "Copia de di",
    Otros = "Otros",
}