import { isNotEmpty, registerDecorator, ValidationOptions, ValidationArguments, isEmail } from 'class-validator';
import { ExceptionsMessage } from '../data/ExceptionsMessage';

export function IsEmailCustom( validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isEmail(value)
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionsMessage.IsEmail(validationArguments.property) 
        }
      },
    });
  };
}