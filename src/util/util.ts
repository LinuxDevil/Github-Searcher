
export const classNames = (className: string, state: string, condition: boolean) => {
  return condition ? `${className} ${className}--${state}` : className
}
