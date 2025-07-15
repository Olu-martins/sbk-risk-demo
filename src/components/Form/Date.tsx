import { ChangeEvent } from "react";

interface DateTimeProps {
  onChange: (date: string) => void;
  value: string;
}

const Date: React.FC<DateTimeProps> = ({ onChange, value }) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDateTime = event.target.value;
    if (onChange) {
      onChange(newDateTime);
    }
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      className="w-full text-[1.6rem] border p-3 rounded-xl cursor-pointer mt-4 border-[#CBD5E0] outline-none"
    />
  );
};

export default Date;
