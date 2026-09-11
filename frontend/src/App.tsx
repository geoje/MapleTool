import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { BossRevenuePage } from "@/pages/boss-revenue/boss-revenue-page";
import { EnhancePage } from "@/pages/enhance/enhance-page";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/boss-revenue" replace />} />
        <Route path="/boss-revenue" element={<BossRevenuePage />} />
        <Route path="/enhance-expected-value" element={<EnhancePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
