import type { InputBooleanFieldOptions, InputEnumFieldOptions, InputNumberFieldOptions, InputStringFieldOptions } from '../types/FieldOptions';
export type GenericSingleFieldOptions = InputBooleanFieldOptions | InputStringFieldOptions | InputNumberFieldOptions | InputEnumFieldOptions;
export type NestedObjectFieldOptions = {
    [key: string]: {
        fields: FormFieldsArray;
        description?: string;
    };
};
export type GenericFieldOptions = GenericSingleFieldOptions | NestedObjectFieldOptions;
export type FormFieldsArray = Array<GenericFieldOptions>;
