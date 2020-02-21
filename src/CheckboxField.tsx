import React from 'react'
import useCheckboxField, { UseCheckboxFieldProps } from './CheckboxField/useCheckboxField'
import CheckboxViewField, { CheckboxViewFieldProps } from './CheckboxField/CheckboxViewField'

export type CheckboxFieldProps = UseCheckboxFieldProps & Omit<CheckboxViewFieldProps, 'field'>

const CheckboxField: React.FC<CheckboxFieldProps> = ({ form, fieldName, validate, validatingRequired, ...others }) => {
    const checkboxField = useCheckboxField({ form, fieldName, validate, validatingRequired })
    return <CheckboxViewField {...checkboxField} {...others} />
}

export default CheckboxField
