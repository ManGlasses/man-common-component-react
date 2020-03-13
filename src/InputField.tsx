import React from 'react'
import useInputField, { UseInputFieldProps } from './InputField/useInputField'
import InputFieldView, { InputFieldViewProps } from './InputField/InputFieldView'

export type InputFieldProps = UseInputFieldProps & Omit<InputFieldViewProps, 'field' | 'validatingRequired'>

const InputField: React.FC<InputFieldProps> = ({
    form,
    fieldName,
    validate,
    validatingRequired,
    variant,
    ...others
}) => {
    const inputField = useInputField({ form, fieldName, validate, validatingRequired })
    return <InputFieldView {...inputField} {...{ validatingRequired, variant }} {...others} />
}

export default InputField
