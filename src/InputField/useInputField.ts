import { FormApi, FieldValidator, FieldState } from 'final-form'
import { useField } from 'react-final-form-hooks'
import { useFormConsumer } from '../FormContext'
import { requiredText } from '../config'

const composeValidators = (...validators: FieldValidator<any>[]) => (
    value: any,
    allValues: object,
    meta?: FieldState<any>,
) => validators.reduce((error, validator) => error || validator(value, allValues, meta), undefined)

export interface UseInputFieldProps {
    form?: FormApi
    name: string
    validate?: FieldValidator<any>[]
    validatingRequired?: boolean
}

const useInputField = ({ form, name, validate, validatingRequired }: UseInputFieldProps) => {
    const formConsumer = useFormConsumer()

    let mergeValidate = validate || []
    if (validatingRequired) {
        mergeValidate.push((value: any) => (value ? undefined : requiredText))
    }

    const field = useField(name, form || formConsumer.form, composeValidators(...mergeValidate))
    return { field }
}

export default useInputField
