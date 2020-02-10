import React from 'react'

export interface ITextFieldProps {
    defaultValue?: string
}

export const TextField: React.FC<ITextFieldProps> = ({ defaultValue }) => {
    return <input {...{ defaultValue }} />
}
