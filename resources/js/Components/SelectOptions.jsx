export default function SelectOptions({
  className,
  options,
  onChangeOption,
  usingObject = false,
  name = "select_option",
  defaultOption = true,
  defaultValue = defaultOption ? "-1" : usingObject ? options[0].name : options[0],
  ...props
}) {
  const handleChange = (e) => {
    const option = e.target.value;
    onChangeOption(option);
  };
  return (
    <select
      aria-label="State"
      name={name}
      {...props}
      className={
        `rounded-xl bg-gray-50 border text-gray-900 border-gray-400 ` +
        className
      }
      onChange={handleChange}
      value={defaultValue}
    >
      {defaultOption && (<option value="-1" disabled>
        Select a option
      </option>)}
      {options.map((opt, index) => (
        <option key={index} value={usingObject ? opt.id : opt}>
          {usingObject ? opt.name : opt}
        </option>
      ))}
    </select>
  );
}
