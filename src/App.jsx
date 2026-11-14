import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { HealthDataProvider } from '@/lib/HealthDataContext';
import { DashboardPage, CheckInPage, SensorPage, EnvironmentPage, TrendsPage, HistoryPage, GuidancePage } from '@/pages';

export default function App() {
  return (
    <HealthDataProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/check-in" element={<CheckInPage />} />
          <Route path="/sensor" element={<SensorPage />} />
          <Route path="/environment" element={<EnvironmentPage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/guidance" element={<GuidancePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HealthDataProvider>
  );
}
