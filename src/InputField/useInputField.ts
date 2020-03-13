import { FormApi, FieldValidator } from 'final-form'
import { useField } from 'react-final-form-hooks'
import { useFormConsumer } from '../FormContext'
import { composeValidators } from '../utils/validate'
import { requiredText } from '../config'

export interface UseInputFieldProps {
    form?: FormApi<any>
    fieldName: string
    validate?: FieldValidator<any>[]
    validatingRequired?: boolean
}

const useInputField = ({ form, fieldName, validate, validatingRequired }: UseInputFieldProps) => {
    const formConsumer = useFormConsumer()
    const finalForm = form || formConsumer.form

    let mergeValidate = validate || []
    if (validatingRequired) {
        mergeValidate.push((value: any) => (value ? undefined : requiredText))
    }

    const field = useField(fieldName, finalForm, composeValidators(...mergeValidate))
    return { field }
}

export default useInputField
