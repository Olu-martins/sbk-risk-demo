import { ChangeEvent } from "react";

interface DateTimeProps {
  onChange: (date: string) => void;
  value: string;
}

const Time: React.FC<DateTimeProps> = ({ onChange, value }) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDateTime = event.target.value;
    if (onChange) {
      onChange(newDateTime);
    }
  };

  return (
    <input
      type="time"
      value={value}
      onChange={handleChange}
      className="w-full text-[1.6rem] border p-3 rounded-xl cursor-pointer border-[#CBD5E0] outline-none"
    />
  );
};
export default Time;
