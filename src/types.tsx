
export interface Project {
  title: string;
  description: string;
  logo?: string;
  source?: string;
  demo?: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
