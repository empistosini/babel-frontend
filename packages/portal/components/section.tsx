import { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

import { Container } from './container'

export type SectionProps = HTMLAttributes<HTMLElement> & {
  title?: string
  description?: string
}

export const Section: FC<SectionProps> = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  const classes = clsx('pt-12 pb-6 md:pt-16 md:pb-10', className)
  return (
    <section className={classes} {...props}>
      <Container>
        {title && (
          <h1 className="text-5xl font-bold max-w-2xl mx-auto mb-8">{title}</h1>
        )}
        {description && (
          <p className="text-2xl font-medium max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  )
}
