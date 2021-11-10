import { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

export const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const classes = clsx(className, 'container mx-auto px-4 sm:px-6 md:px-8')
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
