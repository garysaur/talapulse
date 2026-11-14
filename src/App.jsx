import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DashboardPage from '@/routes/_authed/index';
import CheckInPage from '@/routes/_authed/check-in';
import SensorPage from '@/routes/_authed/sensor';
import EnvironmentPage from '@/routes/_authed/environment';
import TrendsPage from '@/routes/_authed/trends';
import HistoryPage from '@/routes/_authed/history';
import GuidancePage from '@/routes/_authed/guidance';
import { HealthDataProvider } from '@/lib/HealthDataContext';

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
