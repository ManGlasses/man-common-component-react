import React from 'react'
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField'
import { FormApi } from 'final-form'
import { useField, FieldRenderProps } from 'react-final-form-hooks'
import { useFormConsumer } from './FormContext'

export interface IUseInputProps {
    form?: FormApi
    name: string
}

export const useInput = ({ form, name }: IUseInputProps) => {
    const formConsumer = useFormConsumer()
    const field = useField(name, form || formConsumer.form)
    return { field }
}

export interface IInputViewProps extends StandardTextFieldProps {
    field: FieldRenderProps<any, string>
}

export const InputView: React.FC<IInputViewProps> = ({ field, ...others }) => {
    return <TextField {...field.input} {...others} />
}

export interface IInputProps extends StandardTextFieldProps {
    form?: FormApi
    name: string
}

export const Input: React.FC<IInputProps> = ({ form, name, ...others }) => {
    const input = useInput({ form, name })
    return <InputView {...input} {...others} />
}
