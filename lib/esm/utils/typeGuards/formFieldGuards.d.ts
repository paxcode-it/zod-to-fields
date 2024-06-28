import { InputBooleanFieldOptions, InputEnumFieldOptions, InputNumberFieldOptions, InputStringFieldOptions } from '../../types/FieldOptions';
import { FormFieldsArray, GenericFieldOptions, GenericSingleFieldOptions, NestedObjectFieldOptions } from '../../types/FormFieldsArray';
declare function isFormFieldsArray(value: unknown): value is FormFieldsArray;
declare function isNestedObjectFieldOptions(value: unknown, debugging?: boolean): value is NestedObjectFieldOptions;
declare function isGenericSingleFieldOptions(value: GenericFieldOptions): value is GenericSingleFieldOptions;
declare function isInputBooleanFieldOptions(value: GenericSingleFieldOptions): value is InputBooleanFieldOptions;
declare function isInputStringFieldOptions(value: GenericSingleFieldOptions): value is InputStringFieldOptions;
declare function isInputNumberFieldOptions(value: GenericSingleFieldOptions): value is InputNumberFieldOptions;
declare function isInputEnumFieldOptions(value: GenericSingleFieldOptions): value is InputEnumFieldOptions;
declare function isObjectOfFormFieldsArrays(value: unknown): value is {
    [key: string]: FormFieldsArray;
};
export { isFormFieldsArray, isNestedObjectFieldOptions, isGenericSingleFieldOptions, isInputBooleanFieldOptions, isInputStringFieldOptions, isInputNumberFieldOptions, isInputEnumFieldOptions, isObjectOfFormFieldsArrays, };
