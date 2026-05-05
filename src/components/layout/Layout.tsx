import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

export const Layout = () => (
  <div className="min-h-screen text-slate-100">
    <div className="flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header />
        <main className="mx-auto w-full max-w-[1500px] px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
    <MobileNav />
  </div>
)
