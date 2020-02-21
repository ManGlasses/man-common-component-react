import React from 'react'
import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { FieldRenderProps } from 'react-final-form-hooks'

export type CheckboxViewFieldProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
    field: FieldRenderProps<any, string>
    label?: React.ReactNode
}

const CheckboxViewField: React.FC<CheckboxViewFieldProps> = ({ field, label, ...others }) => {
    return label ? (
        <FormControlLabel {...{ label }} control={<Checkbox color='primary' {...field.input} />} {...others} />
    ) : (
        <Checkbox color='primary' {...field.input} />
    )
}

export default CheckboxViewField
