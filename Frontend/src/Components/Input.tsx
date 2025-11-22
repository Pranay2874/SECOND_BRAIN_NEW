
export const Input = ({ onChange, placeholder,ref ,type}: { 
  onChange?: () => void; 
  placeholder?: string; 
  ref?:any;
  type?:string;
}) => {
  return (
    <div>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-gray-300 w-full h-10 p-3 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-[#4071f4] pl-10"
      />
    </div>
  );
};
