const Button = ({
  children,
  disabled,
  className,
  ...rest
}: {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className={`px-4 py-2 rounded transition cursor-pointer ${
        disabled
          ? "bg-slate-900 text-slate-700"
          : "bg-slate-500 hover:bg-slate-600 active:bg-slate-700"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
