

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
    bg?: string
}

const InputSecond = ({ htmlFor, title, type, onChange, value, placeholder, marginY = 'my-6', bg = 'bg-grayCustom', styleTitle = 'text-white' }: Props) => {
    return (
        <div className={`input text-white ${marginY}`}>
            <label htmlFor={htmlFor} className={`font-medium ${styleTitle}`} >{title} </label>
            <input type={type}
                name={htmlFor}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                className={`w-full  rounded-md py-1 px-2 outline-none mt-1 ${bg}`}
            />
        </div>
    )
}

export default InputSecond