import React, { createContext, useContext } from 'react'
import { FormApi } from 'final-form'

export interface IFormProviderProps {
    form: FormApi
}

const FormContext = createContext({} as IFormProviderProps)

export const FormProvider: React.FC<IFormProviderProps> = ({ form, children }) => {
    return <FormContext.Provider value={{ form }}>{children}</FormContext.Provider>
}

export const useFormConsumer = () => useContext(FormContext)
