import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import siteContent from '../content/site-content.json'

const STORAGE_KEY = 'site-language'

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const saved = window.localStorage.getItem(STORAGE_KEY)
    let nextLanguage = 'es'

    if (saved === 'es' || saved === 'en') {
      nextLanguage = saved
    } else {
      const browserLang = window.navigator.language?.toLowerCase() || 'es'
      nextLanguage = browserLang.startsWith('en') ? 'en' : 'es'
    }

    const timeoutId = window.setTimeout(() => {
      setLanguage(nextLanguage)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language)
    }
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(prev => (prev === 'es' ? 'en' : 'es')),
      t: siteContent[language]
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
