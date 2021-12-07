const ScatterMenu = ({options, id, selectedValue, onSelectedValueChange}) => {

    return (
        <div>
            <label for={id}>Choose a pet:</label>
            <select id={id} onChange={
                event => onSelectedValueChange(event.target.value)
            }>
                {options.map(({value, label}) => (
                    <option selected={value === selectedValue} value={value}>{label}</option>
                ))
                }
            </select>
        </div>
    )
}

export default ScatterMenu;