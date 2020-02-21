import React from 'react'
import useComboboxField, { UseComboboxFieldProps } from './ComboboxField/useComboboxField'
import ComboboxFieldView, { ComboboxFieldViewProps } from './ComboboxField/ComboboxFieldView'

export type ComboboxFieldProps = UseComboboxFieldProps & ComboboxFieldViewProps

const ComboboxField: React.FC<ComboboxFieldProps> = ({
    fieldName,
    validate,
    items = [],
    uniqueKey = 'value',
    searchKeys = ['name'],
    ...others
}) => {
    const comboboxField = useComboboxField({ fieldName, validate, items, uniqueKey, searchKeys })
    return <ComboboxFieldView {...comboboxField} {...{ uniqueKey, searchKeys }} {...others} />
}

export default ComboboxField
