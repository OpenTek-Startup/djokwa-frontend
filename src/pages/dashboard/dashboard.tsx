import React from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/layout/page-header'

const Dashboard: React.FC = () => {
  const { t } = useTranslation('dashboard')

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title={t('title', 'Dashboard')}
        description={t('description', 'Overview of your system.')}
      />

      {/* Add more dashboard content here */}
    </div>
  )
}

export default Dashboard
