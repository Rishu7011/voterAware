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
  type SignUpData = {
    fullName: string;
    email: string;
    password: string;
  }
  type SignInData = {
    email: string;
    password: string;
  }
  type ApiResponse = {
    token?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: string;
      updatedAt: string;
    };
    message?: string;
    error?: string;
  }
}

export { }
