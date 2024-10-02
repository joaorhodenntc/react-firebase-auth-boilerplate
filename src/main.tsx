import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthGoogleProvider } from './context/authGoogle.tsx'
import AppRoutes from './routes/routes.tsx'
import Navbar from './components/navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthGoogleProvider>
      <Navbar />
      <AppRoutes />
    </AuthGoogleProvider>
  </StrictMode>,
)
