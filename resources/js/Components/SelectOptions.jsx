export default function SelectOptions({
  className,
  options,
  onChangeOption,
  usingObject = false,
  ...props
}) {
  const handleChange = (e) => {
    const option = e.target.value;
    onChangeOption(option);
  };
  return (
    <select
      {...props}
      className={
        `rounded-xl bg-gray-50 border text-gray-900 border-gray-400 ` +
        className
      }
      onChange={handleChange}
    >
      <option selected disabled>
        Select a option
      </option>
      {options.map((opt, index) => (
        <option key={index} value={usingObject ? opt.id : opt}>
          {usingObject ? opt.name : opt}
        </option>
      ))}
    </select>
  );
}
