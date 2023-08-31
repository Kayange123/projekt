import React, { HTMLInputTypeAttribute } from 'react'

interface FormFieldProps {
    title: string;
    placeholder: string;
    state: string;
    type?: HTMLInputTypeAttribute;
    setState: (value: string)=> void;
    isTextArea?: boolean;
    required?: boolean;
}

const FormField = ({title,state, placeholder, isTextArea, setState, type, required}: FormFieldProps) => {
  return (
    <div className='flexStart flex-col w-full gap-4'>
        <label htmlFor="" className='w-full text-gray-600'>{title}</label>
        {isTextArea ? (
            <textarea rows={4} placeholder={placeholder} required={required} value={state} className='form_field-input' onChange={(e)=>setState(e.target.value)}/>
        ): (
            <input required={required} placeholder={placeholder} value={state} className='form_field-input' onChange={(e)=>setState(e.target.value)} type={type || 'text'}/>
        )}
    </div>
  )
}

export default FormField