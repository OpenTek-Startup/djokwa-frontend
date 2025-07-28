import { useTranslation } from 'react-i18next'

const AboutUs = () => {
  const { t } = useTranslation('about')
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}

export default AboutUs
