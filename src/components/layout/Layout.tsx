import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

export const Layout = () => (
  <div className="min-h-screen text-slate-100">
    <div className="flex">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
        {/* Spacer for bottom nav on mobile */}
        <div className="h-16 lg:hidden" />
      </div>
    </div>
    <MobileNav />
  </div>
)
