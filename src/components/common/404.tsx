import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const navigate = useNavigate()
  const { t } = useTranslation('common')
  return (
    <section className="flex h-screen items-center   bg-background/50">
      <div className="container flex flex-col items-center ">
        <div className="flex max-w-md flex-col gap-6 text-center">
          <h2 className="text-9xl font-extrabold text-foreground/75">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl">{t('page_not_found')}</p>
          <div
            onClick={() => navigate(-1)}
            className="cursor-pointer rounded bg-primary/60 px-8 py-4 text-xl font-semibold text-foreground/50 hover:text-foreground/20"
          >
            {t('go_back')}
          </div>
          <Link
            to={'/'}
            className="rounded bg-purple-600 px-8 py-4 text-xl font-semibold text-foreground/50 hover:text-foreground/20"
          >
            {t('back_to_home')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
