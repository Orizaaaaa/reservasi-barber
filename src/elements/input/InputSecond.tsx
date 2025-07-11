

type Props = {
    htmlFor: string
    title?: string
    type: string
    onChange: any
    value: number | string
    placeholder?: string,
    className?: string
    styleTitle?: string,
    marginY?: string
}

const InputSecond = ({ htmlFor, title, type, onChange, value, placeholder, marginY = 'my-6' }: Props) => {
    return (
        <div className={`input ${marginY}`}>
            <label htmlFor={htmlFor} className="font-medium text-white" >{title} </label>
            <input type={type}
                name={htmlFor}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                className='w-full bg-grayCustom rounded-md py-1 px-2 outline-none mt-1'
            />
        </div>
    )
}

export default InputSecond