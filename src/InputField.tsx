import React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'
import useInputField, { UseInputFieldProps } from './InputField/useInputField'
import InputFieldView from './InputField/InputFieldView'

export type InputProps = UseInputFieldProps & TextFieldProps

const InputField: React.FC<InputProps> = ({ form, fieldName, validate, validatingRequired, ...others }) => {
    const inputField = useInputField({ form, fieldName, validate, validatingRequired })
    return <InputFieldView {...inputField} {...{ validatingRequired }} {...others} />
}

export default InputField
