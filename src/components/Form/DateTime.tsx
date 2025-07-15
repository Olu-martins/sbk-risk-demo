import { useField } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

interface DateTimeProps {
  onChange: (dateTime: string) => void;
}

const DateTime: React.FC<DateTimeProps> = ({ onChange }) => {
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDateTime = event.target.value;
    setDateTime(newDateTime);
    if (onChange) {
      onChange(newDateTime);
    }
  };

  return (
    <input
      type="datetime-local"
      value={dateTime}
      onChange={handleChange}
      className="w-full text-[1.6rem] border-2 p-3 rounded-xl cursor-pointer mt-4 border-BrandGrey500 outline-none"
    />
  );
};

interface DateTimeWithFormikProps {
  name: string;
}

export const DateTimeWithFormik: React.FC<DateTimeWithFormikProps> = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );

  useEffect(() => {
    helpers.setValue(dateTime);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDateTime = event.target.value;
    setDateTime(newDateTime);
    helpers.setValue(newDateTime);
  };

  return (
    <div>
      <input
        type="datetime-local"
        {...field}
        value={dateTime}
        onChange={handleChange}
        className="w-full text-[1.6rem] border-2 p-3 rounded-xl cursor-pointer mt-4 border-BrandGrey500 outline-none"
      />
      {meta.touched && meta.error ? (
        <p className="error text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default DateTime;
