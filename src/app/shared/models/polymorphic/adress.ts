export interface Address {
    country?: country;
    region?: region;
    province?: province;
    city?:     keyof typeof city[province] | null;
    street?:   string;
    number?:   string;
}

export enum country{
    'Perú' = "Peru",
}

export enum region{
    'Junin' = "Junin",
}

export enum province{
    'Chupaca' = "Chupaca",
    'Concepcion' = "Concepcion",
    'Huancayo' = "Huancayo",
    'Jauja' = "Jauja"
}

export const city = {
    'Chupaca' : { 'Chupaca' :'Chupaca', 'Chongos Bajo' : 'Chongos Bajo', 'Huamancac aChico' : 'Huamancaca Chico'},
    'Concepcion' : { 'Concepcion': 'Concepción', 'Mito' : 'Mito', 'Matahuasi' : 'Matahuasi', 'Orcotuna' : ' Orcotuna'},
    'Huancayo': {
        'Chilca': 'Chilca', 'Chongos Alto': 'Chongos Alto', 'El Tambo': 'El Tambo', 'Hualhuas': 'Hualhuas', 
        'Huancan': 'Huancán', 'Huancayo': 'Huancayo', 'Huayucachi': 'Huayucachi', 'Ingenio': 'Ingenio',
        'Pilcomayo': 'Pilcomayo', 'Pucará': 'Pucará', 'Quilcas': 'Quilcas', 'San Agustín De Cajas': 'San Agustín de Cajas',
        'San Jerónimo De Tunán': 'San Jerónimo de Tunán', 'San Pedro De Saño': 'San Pedro de Saño', 'Sapallanga': 'Sapallanga',
        'Sicaya': 'Sicaya', 'Viques': 'Viques'
    },
    'Jauja': { 'Jauja': 'Jauja' }
}