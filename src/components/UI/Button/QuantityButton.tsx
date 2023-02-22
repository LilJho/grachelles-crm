const QuantityButton = ({
  children,
  onClick = () => {},
  disabled = false,
}: any) => {
  return (
    <button
      className="p-1.5 rounded bg-primary-50 text-primary-800 transition-transform active:scale-95 disabled:bg-gray-50 disabled:text-gray-800 disabled:hover:bg-gray-200 disabled:active:bg-gray-200 disabled:active:scale-100"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default QuantityButton;
