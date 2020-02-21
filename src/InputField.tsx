import React from 'react'
import useInputField, { UseInputFieldProps } from './InputField/useInputField'
import InputFieldView, { InputFieldViewProps } from './InputField/InputFieldView'

export type InputFieldProps = UseInputFieldProps & Omit<InputFieldViewProps, 'field' | 'variant' | 'validatingRequired'>

const InputField: React.FC<InputFieldProps> = ({ form, fieldName, validate, validatingRequired, ...others }) => {
    const inputField = useInputField({ form, fieldName, validate, validatingRequired })
    return <InputFieldView {...inputField} {...{ validatingRequired }} {...others} />
}

export default InputField
