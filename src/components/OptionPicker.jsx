function OptionPicker({ label, options, value, onChange }) {
  return (
    <div className="picker">
      <span className="picker-label">{label}</span>
      <div className="picker-options" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={option.value === value ? 'picker-btn active' : 'picker-btn'}
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OptionPicker