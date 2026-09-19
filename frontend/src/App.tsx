import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { BossRevenuePage } from "@/pages/boss-revenue/boss-revenue-page";
import { EnhanceExpectedValuePage } from "@/pages/enhance-expected-value/enhance-expected-value-page";
import { UnionArtifactPage } from "@/pages/union-artifact/union-artifact-page";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/boss-revenue" replace />} />
        <Route path="/boss-revenue" element={<BossRevenuePage />} />
        <Route path="/enhance-cost" element={<EnhanceExpectedValuePage />} />
        <Route path="/union-artifact" element={<UnionArtifactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
