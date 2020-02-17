import { useState, useEffect } from 'react'
import { FormApi, FieldValidator } from 'final-form'
import { useField } from 'react-final-form-hooks'
import { useCombobox } from 'downshift'
import { useFormConsumer } from '../FormContext'
import { composeValidators } from '../utils/validate'
import { requiredText } from '../config'

export interface UseComboboxFieldProps {
    form?: FormApi
    fieldName: string
    validate?: FieldValidator<any>[]
    validatingRequired?: boolean
    items: object[]
    uniqueKey: string
    searchKeys: string[]
}

const useComboboxField = ({
    form,
    fieldName,
    validate,
    validatingRequired,
    items,
    uniqueKey,
    searchKeys,
}: UseComboboxFieldProps) => {
    const formConsumer = useFormConsumer()

    let mergeValidate = validate || []
    if (validatingRequired) {
        mergeValidate.push((value: any) => (value ? undefined : requiredText))
    }

    const field = useField(fieldName, form || formConsumer.form, composeValidators(...mergeValidate))
    const [inputItems, setInputItems] = useState(items)
    const [inputHighlightedIndex, setInputHighlightedIndex] = useState(-1)
    const [scrollIndex, setScrollIndex] = useState(0)

    const combobox = useCombobox({
        selectedItem: items.filter(item => field.input.value === item[uniqueKey])?.[0],
        items: inputItems,
        highlightedIndex: inputHighlightedIndex,
        onIsOpenChange: ({ isOpen, selectedItem }) => {
            if (isOpen) {
                const selectedItemIndex = items.findIndex(item => selectedItem?.[uniqueKey] === item[uniqueKey])
                combobox.setHighlightedIndex(selectedItemIndex)
                setInputHighlightedIndex(selectedItemIndex)
                setScrollIndex(selectedItemIndex)
            }
        },
        onInputValueChange: ({ inputValue }) => {
            const filtered = items.filter(item =>
                searchKeys.some(searchKey =>
                    item[searchKey]
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes(inputValue?.toString()?.toLowerCase()),
                ),
            )
            setInputItems(filtered)
            setInputHighlightedIndex(-1)
            setScrollIndex(0)
        },
        onHighlightedIndexChange: ({ highlightedIndex }) => {
            if (highlightedIndex !== undefined && highlightedIndex !== -1) {
                setInputHighlightedIndex(highlightedIndex)
            }
        },
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem !== undefined) {
                field.input.onChange(selectedItem[uniqueKey])
            }
        },
    })

    useEffect(() => {
        formConsumer.form.mutators.setFieldData(name, { ...combobox.selectedItem })
    }, [combobox.selectedItem])

    const onKeyDownInput = (event: KeyboardEvent) => {
        const { key } = event
        const previousIndex = combobox.highlightedIndex <= 0 ? inputItems.length - 1 : combobox.highlightedIndex - 1
        const nextIndex = combobox.highlightedIndex >= inputItems.length - 1 ? 0 : combobox.highlightedIndex + 1
        switch (key) {
            case 'ArrowUp':
                event.preventDefault()
                combobox.setHighlightedIndex(previousIndex)
                setScrollIndex(previousIndex)
                break
            case 'ArrowDown':
                event.preventDefault()
                combobox.setHighlightedIndex(nextIndex)
                setScrollIndex(nextIndex)
                break
            case 'Enter':
                event.preventDefault()
                combobox.selectItem(inputItems[combobox.highlightedIndex])
                setScrollIndex(nextIndex)
                combobox.closeMenu()
                break
            default:
                break
        }
    }

    const createTextFromItem = (item: object, searchKeys: string[]) => {
        return item
            ? searchKeys
                  .filter(searchKey => !!item[searchKey])
                  .map(searchKey => item[searchKey])
                  .join(', ')
            : ''
    }

    return {
        inputItems,
        scrollIndex,
        combobox,
        onKeyDownInput,
        createTextFromItem,
    }
}

export default useComboboxField
