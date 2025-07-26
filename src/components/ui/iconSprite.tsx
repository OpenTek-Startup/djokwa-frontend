import React from 'react'
import sprite from '../../assets/svg/sprite.svg'

interface IconSpriteProps {
  name: string
  color?: string
  className?: string
  width?: string
  height?: string
  stroke?: string
}

const IconSprite: React.FC<IconSpriteProps> = ({
  color,
  name,
  className,
  width = '25px',
  height = '25px',
  stroke = 'currentColor'
}) => {
  return (
    <svg
      className={className + 'icon icon-tabler icon-tabler-arrow-big-left'}
      fill={color}
      width={width}
      height={height}
      stroke={stroke}
    >
      <use href={`${sprite}#${name}`} />
    </svg>
  )
}

export default IconSprite
