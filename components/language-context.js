import { createContext, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import siteContent from '../content/site-content.json'

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  const router = useRouter()
  const routeLanguage = router.locale === 'en' ? 'en' : 'es'
  const language = routeLanguage

  useEffect(() => {
    document.documentElement.lang = routeLanguage
  }, [routeLanguage])

  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () => {
        const nextLanguage = language === 'es' ? 'en' : 'es'
        router.push(router.asPath, router.asPath, { locale: nextLanguage, scroll: false })
      },
      t: siteContent[language]
    }),
    [language, router]
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
