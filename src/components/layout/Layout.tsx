import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { useTranslation } from 'react-i18next'

export const Layout = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen text-slate-100">
      <div className="flex">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
          <footer className="mx-auto w-full max-w-[1500px] px-4 pb-6 text-xs text-slate-500 lg:px-8">
            <a
              href="https://www.lindigi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-md border border-white/[0.06] px-3 py-2 transition-colors hover:border-emerald-300/25 hover:text-emerald-100"
            >
              {t('app.poweredBy')}
            </a>
          </footer>
          <div className="h-16 lg:hidden" />
        </div>
      </div>
      <MobileNav />
    </div>
  )
}
