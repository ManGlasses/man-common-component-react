import React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'
import useInputField, { UseInputFieldProps } from './InputField/useInputField'
import InputFieldView from './InputField/InputFieldView'

export type InputProps = TextFieldProps & UseInputFieldProps

const InputField: React.FC<InputProps> = ({ form, name, validate, validatingRequired, ...others }) => {
    const input = useInputField({ form, name, validate, validatingRequired })
    return <InputFieldView {...input} {...{ validatingRequired }} {...others} />
}

export default InputField
