import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { AbilityBuildPage } from "@/pages/ability-build/ability-build-page";
import { BossRevenuePage } from "@/pages/boss-revenue/boss-revenue-page";
import { EnhanceCostPage } from "@/pages/enhance-cost/enhance-cost-page";
import { UnionArtifactPage } from "@/pages/union-artifact/union-artifact-page";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/boss-revenue" replace />} />
        <Route path="/boss-revenue" element={<BossRevenuePage />} />
        <Route path="/enhance-cost" element={<EnhanceCostPage />} />
        <Route path="/union-artifact" element={<UnionArtifactPage />} />
        <Route path="/ability-build" element={<AbilityBuildPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
