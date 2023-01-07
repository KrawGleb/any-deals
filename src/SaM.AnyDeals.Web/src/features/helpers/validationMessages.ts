export class ValidationMessages {
  static required = (field: string) => `${field} is a required field.`;
  static email = () => "Invalid email format.";
}
