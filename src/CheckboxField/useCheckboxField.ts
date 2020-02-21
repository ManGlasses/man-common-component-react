import { FormApi, FieldValidator } from 'final-form'
import { useField } from 'react-final-form-hooks'
import { useFormConsumer } from '../FormContext'
import { composeValidators } from '../utils/validate'
import { requiredText } from '../config'

export interface UseCheckboxFieldProps {
    form?: FormApi
    fieldName: string
    validate?: FieldValidator<any>[]
    validatingRequired?: boolean
}

const useCheckboxField = ({ form, fieldName, validate, validatingRequired }: UseCheckboxFieldProps) => {
    const formConsumer = useFormConsumer()

    let mergeValidate = validate || []
    if (validatingRequired) {
        mergeValidate.push((value: any) => (value ? undefined : requiredText))
    }

    const field = useField(fieldName, form || formConsumer.form, composeValidators(...mergeValidate))
    return { field }
}

export default useCheckboxField
