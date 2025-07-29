import * as React from "react"
import { clsx } from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import messages from './messages';
//import { FormattedMessage } from 'react-intl';
import { Button } from '../Button';

export interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, size = 'default' }, ref) => {
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
      // Check if dark mode is enabled
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }, [])

    const toggleTheme = () => {
      const newIsDark = !isDark
      setIsDark(newIsDark)
      
      if (newIsDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }

    const sizeClasses = {
      sm: 'h-8 w-8 [&_svg]:size-3.5',
      default: 'h-9 w-9 [&_svg]:size-4',
      lg: 'h-10 w-10 [&_svg]:size-5'
    }

    return (
  <Button
    ref={ref}
    onClick={toggleTheme}
    type="button"
    className={clsx(
      "inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      sizeClasses[size],
      className
    )}
    aria-label={
      isDark ? messages.light.defaultMessage : messages.dark.defaultMessage
    }
  >
    <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
  </Button>
)

  }
)
ThemeToggle.displayName = "ThemeToggle"

export { ThemeToggle }