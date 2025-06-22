import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium';
  icon?: string;
}

const baseStyles =
  'inline-flex items-center justify-center rounded font-medium focus:outline-none transition-colors';

const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-100 text-red-700 hover:bg-red-200',
};

const sizes = {
  small: 'text-sm px-3 py-1',
  medium: 'px-4 py-2',
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  return (
    <button className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {icon && <img src={icon} alt="" className={clsx(children ? 'w-4 h-4 mr-1' : 'w-5 h-5')} />}
      {children}
    </button>
  );
};

export default Button;
