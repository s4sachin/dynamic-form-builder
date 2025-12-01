import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormPage } from './pages/FormPage';
import { SubmissionsPage } from './pages/SubmissionsPage';
import { Toaster } from './components/Toast';
import './App.css';

const queryClient = new QueryClient();

type PageType = 'form' | 'submissions';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('form');

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('form')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'form'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  New Submission
                </button>
                <button
                  onClick={() => setCurrentPage('submissions')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'submissions'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  View Submissions
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>
          {currentPage === 'form' && <FormPage />}
          {currentPage === 'submissions' && (
            <SubmissionsPage onNavigateToForm={() => setCurrentPage('form')} />
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
