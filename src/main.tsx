import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/authContext.tsx'
import AppRoutes from './routes/routes.tsx'
import Navbar from './components/navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Navbar />
      <AppRoutes />
    </AuthProvider>
  </StrictMode>,
)
