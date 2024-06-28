import { z } from 'zod';
declare const setDefaultOptions: (fieldKey: string, fieldValue: z.ZodTypeAny) => {
    id: string;
    label: string;
    name: string;
    tag: "input" | "select";
};
export { setDefaultOptions };
