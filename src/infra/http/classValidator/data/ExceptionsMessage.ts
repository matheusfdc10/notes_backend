export const ExceptionsMessage = {
    IsNotEmpty: (property: string) => `O campo ${property} é obrigatório`,
    IsEmail: (property: string) => `O campo ${property} deve ser um email`,
    IsString: (property: string) => `O campo ${property} deve estar no formato string`,
    MinLength: (min: number, property: string) => `O campo ${property} precisa ter ${min} caracter${min > 1 ? "res": ""}`,
}