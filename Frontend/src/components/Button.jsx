const Button = ({ label, color, onClick, className }) => {
  let bgColorClass, hoverColorClass;

  // Determine background and hover color classes based on the 'color' prop
  switch (color) {
    case 'blue':
      bgColorClass = 'bg-blue-500';
      hoverColorClass = 'hover:bg-blue-700';
      break;
    case 'black':
      bgColorClass = 'bg-black';
      hoverColorClass = 'hover:bg-gray-500';
      break;
    case 'red':
      bgColorClass = 'bg-red-500';
      hoverColorClass = 'hover:bg-red-600';
      break;
    case 'green':
      bgColorClass = 'bg-green-500';
      hoverColorClass = 'hover:bg-green-600';
      break;
    default:
      bgColorClass = 'bg-black';
      hoverColorClass = 'hover:bg-gray-500';
  }

  return (
    <button
      className={`text-white rounded-md py-2 px-5 ${bgColorClass} ${hoverColorClass} transition duration-300 ease-in-out cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
