import React from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { FieldRenderProps } from 'react-final-form-hooks'

export type InputFieldViewProps = TextFieldProps & {
    field: FieldRenderProps<any, string>
    validatingRequired?: boolean
}

const InputFieldView: React.FC<InputFieldViewProps> = ({ field, validatingRequired, ...others }) => {
    const error = field.meta.touched && (field.meta.error || field.meta.submitError)
    return (
        <TextField
            {...field.input}
            required={validatingRequired}
            error={!!error}
            helperText={error}
            InputLabelProps={{ shrink: true }}
            {...others}
        />
    )
}

export default InputFieldView
