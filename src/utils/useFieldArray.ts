import React from 'react'
import { FieldSubscription, fieldSubscriptionItems, FormApi, FieldValidator } from 'final-form'
import { Mutators } from 'final-form-arrays'
import { useField } from 'react-final-form-hooks'

const all: FieldSubscription = fieldSubscriptionItems.reduce((result, key) => {
    result[key] = true
    return result
}, {})

function useConstant<T>(init: () => T): T {
    const ref = React.useRef<T>()
    if (!ref.current) {
        ref.current = init()
    }
    return ref.current
}

const useFieldArray = <FieldValue, FormValues extends object>(
    name: string,
    form: FormApi<FormValues>,
    validateProp?: FieldValidator<FieldValue>,
    subscription: FieldSubscription = all,
) => {
    const formMutators: Partial<Mutators> = form.mutators
    const hasMutators = !!(formMutators && formMutators.push && formMutators.pop)
    if (!hasMutators) {
        throw new Error(
            'Array mutators not found. You need to provide the mutators from final-form-arrays to your form',
        )
    }

    const mutators = useConstant<Partial<Mutators>>(() =>
        Object.keys(formMutators).reduce((result, key) => {
            result[key] = (...args: any) => formMutators[key](name, ...args)
            return result
        }, {}),
    )

    const validate: FieldValidator<FieldValue> = useConstant(() => (value, allValues, meta) => {
        if (!validateProp) return undefined
        const error = validateProp(value, allValues, meta)
        if (!error || Array.isArray(error)) {
            return error
        }
    })

    const {
        meta: { length, ...meta },
        input,
        ...fieldState
    } = useField(name, form, validate, { ...subscription, length: true })

    const forEach = (iterator: (name: string, index: number) => void): void => {
        const len = length || 0
        for (let i = 0; i < len; i++) {
            iterator(`${name}[${i}]`, i)
        }
    }

    const map = (iterator: (name: string, index: number) => any): any[] => {
        const len = length || 0
        const results: any[] = []
        for (let i = 0; i < len; i++) {
            results.push(iterator(`${name}[${i}]`, i))
        }
        return results
    }

    return {
        fields: {
            name,
            forEach,
            length: length || 0,
            map,
            ...mutators,
            ...fieldState,
            value: input.value,
        },
        meta,
    }
}

export default useFieldArray
