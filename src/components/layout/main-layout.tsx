import { Footer } from './site-footer'
import { SiteHeader } from './site-header'

type MainLayoutProps = {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
