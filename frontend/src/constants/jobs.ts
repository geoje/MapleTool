import blank from "../assets/union/raid/job/blank.png";
import warrior from "../assets/union/raid/job/warrior.png";
import magician from "../assets/union/raid/job/magician.png";
import bowman from "../assets/union/raid/job/bowman.png";
import thief from "../assets/union/raid/job/thief.png";
import pirate from "../assets/union/raid/job/pirate.png";
import xenon from "../assets/union/raid/job/xenon.png";
import maplem from "../assets/union/raid/job/maplem.png";

const DATA = {
  warrior: [
    "검사",
    "파이터",
    "페이지",
    "스피어맨",
    "크루세이더",
    "나이트",
    "버서커",
    "히어로",
    "팔라딘",
    "다크나이트",
    "소울마스터",
    "미하일",
    "아란",
    "데몬슬레이어",
    "데몬어벤져",
    "블래스터",
    "카이저",
    "제로",
    "아델",
  ],
  magician: [
    "매지션",
    "위자드(불,독)",
    "위자드(썬,콜)",
    "클레릭",
    "메이지(불,독)",
    "메이지(썬,콜)",
    "프리스트",
    "아크메이지(불,독)",
    "아크메이지(썬,콜)",
    "비숍",
    "플레임위자드",
    "에반",
    "배틀메이지",
    "루미너스",
    "키네시스",
    "일리움",
    "라라",
  ],
  bowman: [
    "아처",
    "헌터",
    "사수",
    "레인저",
    "저격수",
    "보우마스터",
    "신궁",
    "아처(패스파인더)",
    "에인션트아처",
    "체이서",
    "패스파인더",
    "윈드브레이커",
    "와일드헌터",
    "메르세데스",
    "카인",
  ],
  thief: [
    "로그",
    "어쌔신",
    "시프",
    "허밋",
    "시프마스터",
    "나이트로드",
    "섀도어",
    "세미듀어러",
    "듀어러",
    "듀얼마스터",
    "슬래셔",
    "듀얼블레이더",
    "나이트워커",
    "팬텀",
    "카데나",
    "호영",
    "칼리",
  ],
  pirate: [
    "해적",
    "인파이터",
    "건슬링거",
    "캐논슈터",
    "버커니어",
    "발키리",
    "캐논블래스터",
    "바이퍼",
    "캡틴",
    "캐논마스터",
    "스트라이커",
    "메카닉",
    "엔젤릭버스터",
    "은월",
    "아크",
  ],
  xenon: ["제논"],
  maplem: ["메이플M"],
  blank: ["초보자", "노블레스", "시티즌"],
};

export const JOBS: { name: string; icon: string }[] = [
  ...DATA.warrior.map((name) => ({ name, icon: warrior })),
  ...DATA.magician.map((name) => ({ name, icon: magician })),
  ...DATA.bowman.map((name) => ({ name, icon: bowman })),
  ...DATA.thief.map((name) => ({ name, icon: thief })),
  ...DATA.pirate.map((name) => ({ name, icon: pirate })),
  ...DATA.xenon.map((name) => ({ name, icon: xenon })),
  ...DATA.maplem.map((name) => ({ name, icon: maplem })),
  ...DATA.blank.map((name) => ({ name, icon: blank })),
];
