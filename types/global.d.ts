declare global {
  type SelectFieldProps = {
    placeholder?: string
    value?: number
    onChange?: (value: number) => void
  }

  type SourceCardProps = {
    icon?: keyof typeof MaterialIcons.glyphMap
    title: string
    subtitle: string
    href?: string
    uri?: string
  }

  type TimelineProps = {
    title: string
    desc: string
    icon: keyof typeof MaterialIcons.glyphMap
    isLast?: boolean
  }
}

export { }
