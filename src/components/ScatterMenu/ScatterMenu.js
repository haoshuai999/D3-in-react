export const ScatterMenu = ({options, id, label, selectedValue, onSelectedValueChange}) => {

    return (
        <>
            <select id={id} onChange={
                event => onSelectedValueChange(event.target.value)
            }>
                {options.map(({value, label}) => (
                    <option selected={value === selectedValue} value={value}>{label}</option>
                ))
                }
            </select>
        </>
    )
}

export default ScatterMenu;