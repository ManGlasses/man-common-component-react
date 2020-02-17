import { FieldValidator, FieldState } from 'final-form'

export const composeValidators = (...validators: FieldValidator<any>[]) => (
    value: any,
    allValues: object,
    meta?: FieldState<any>,
) => validators.reduce((error, validator) => error || validator(value, allValues, meta), undefined)
