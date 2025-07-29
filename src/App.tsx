import React, { useEffect } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
import { Tooltip } from "@/components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
// import { LoginModal } from "@/components/auth";
import { Navbar } from "@/components/layout/NavBar";
// import { Dashboard } from "@/components/dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize theme on app start
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Blur overlay when not authenticated */}
      {!isAuthenticated && !isLoading && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-background/20" />
      )}
      
      {/* Login Modal */}
{/* <LoginModal open={!isAuthenticated && !isLoading} /> */}
      
      {/* Main App Content */}
      <div className={!isAuthenticated && !isLoading ? "blur-sm pointer-events-none" : ""}>
        {isAuthenticated && <Navbar />}
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuthenticated ? 
            <NotFound />
             : <Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
