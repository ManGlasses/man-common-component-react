import React from 'react'
import useComboboxField, { UseComboboxFieldProps } from './ComboboxField/useComboboxField'
import ComboboxFieldView, { ComboboxFieldViewProps } from './ComboboxField/ComboboxFieldView'

export type ComboboxFieldProps = UseComboboxFieldProps &
    Omit<
        ComboboxFieldViewProps,
        'inputItems' | 'scrollIndex' | 'combobox' | 'onKeyDownInput' | 'uniqueKey' | 'searchKeys'
    >

const ComboboxField: React.FC<ComboboxFieldProps> = ({
    form,
    fieldName,
    validate,
    items = [],
    uniqueKey = 'value',
    searchKeys = ['name'],
    variant,
    ...others
}) => {
    const comboboxField = useComboboxField({ form, fieldName, validate, items, uniqueKey, searchKeys })
    return <ComboboxFieldView {...comboboxField} {...{ uniqueKey, searchKeys, variant }} {...others} />
}

export default ComboboxField
