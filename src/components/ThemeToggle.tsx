import { motion } from 'framer-motion';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`relative rounded-full p-2 transition-colors ${
            theme === value
              ? 'text-primary'
              : 'text-secondary/60 hover:text-secondary'
          }`}
          aria-label={`Switch to ${label} theme`}
          title={`${label} theme`}
        >
          {theme === value && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Icon size={16} className="relative z-10" />
        </button>
      ))}
    </div>
  );
}
