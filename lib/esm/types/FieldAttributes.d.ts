type AdditionalAttributes = {
    [key: string]: any;
};
export type BaseFieldAttributes = {
    tag: 'input' | 'select';
    name: string;
    id: string;
    type: EnhancedHTMLInputTypeAttribute;
    label: string;
};
export type ExtendedFieldAttributes = BaseFieldAttributes & AdditionalAttributes;
type EnhancedHTMLInputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'select' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | (string & NonNullable<unknown>);
export {};
