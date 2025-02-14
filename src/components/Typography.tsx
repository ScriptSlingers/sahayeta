'use client'
import clsx from 'clsx'
import { ReactNode } from 'react'

const variantsMapping = {
  display: 'h1',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  body: 'p',
  body2: 'p',
  label: 'p'
}

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode
  className?: string
  as?: string
  variant?:
    | 'display'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6'
    | 'body'
    | 'label'
  align?: 'left' | 'center' | 'right' | 'justify'
  upperCase?: boolean
}

export const Typography: React.FunctionComponent<TypographyProps> = ({
  variant = 'body',
  align,
  as,
  children,
  className,
  upperCase = false,
  ...rest
}) => {
  const Component = as ? as : variant ? variantsMapping[variant] : 'p'

  const classNames = clsx(
    {
      'text-display-sm lg:text-display capitalize': variant === 'display',
      'text-heading1-sm lg:text-heading1': variant === 'heading1',
      'text-heading2-sm lg:text-heading2': variant === 'heading2',
      'text-heading3-sm lg:text-heading3': variant === 'heading3',
      'text-heading4-sm lg:text-heading4': variant === 'heading4',
      'text-heading5-sm lg:text-heading5': variant === 'heading5',
      'text-heading6-sm lg:text-heading6': variant === 'heading6',
      'text-body-sm lg:text-body': variant === 'body',
      'text-label-sm lg:text-label': variant === 'label',
      'font-playfair text-gray-900':
        variant === 'display' ||
        variant === 'heading1' ||
        variant === 'heading2' ||
        variant === 'heading3' ||
        variant === 'heading4' ||
        variant === 'heading5' ||
        variant === 'heading6',
      'font-maven text-gray-600': variant === 'label' || variant === 'body',
      uppercase: upperCase,
      'text-left': align == 'left',
      'text-right': align == 'right',
      'text-center': align == 'center',
      'text-justify': align == 'justify'
    },
    `${className ? className : ''}`
  )

  return (
    <div className={classNames}>
      <Component {...rest}>{children}</Component>
    </div>
  )
}
