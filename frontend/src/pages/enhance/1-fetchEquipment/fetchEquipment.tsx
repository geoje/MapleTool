import { useState } from "react";

enum TabType {
  PRESET1,
  PRESET2,
  PRESET3,
  ROOTABIS, // 루타비스
  ABSOLUTE, // 앱솔랩스
  ARCANESHADE, // 아케인셰이드
  ETERNEL, // 에테르넬
  BOSS, // 보스
  DAWN, // 여명
  BLACK, // 칠흑
  RADIANCE, // 광휘
}

export default function FetchEquipment() {
  const [tab, setTab] = useState(TabType.PRESET1);

  return <></>;
}
