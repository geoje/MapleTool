## 🍁 소개

<table>
<tr>
  <th align="center">💎 보스 수익</th>
  <th align="center">🔨 강화 비용</th>
</tr>
<tr>
  <td><img src="https://github.com/user-attachments/assets/20d467f4-7322-417f-a5a9-ecc3feaf7b14" /></td>
  <td><img src="https://github.com/user-attachments/assets/65fe92cf-972e-45c4-ad21-6a8e5ee5714e" /></td>
</tr>
<tr>
  <th align="center">🔮 유니온 아티팩트</th>
  <th align="center">🏅 어빌리티 빌드</th>
</tr>
<tr>
  <td><img src="https://github.com/user-attachments/assets/6a787d85-79ca-4f2c-a9c0-617a73ade9de" /></td>
  <td><img src="https://github.com/user-attachments/assets/678dd4d3-8ed6-4207-bd82-03433a9f282a" /></td>
</tr>
</table>

## 💻 로컬 실행

`NEXON_API_KEY`는 [Nexon Open API](https://openapi.nexon.com)에서 발급받은 값으로 바꿔주세요.

```bash
NEXON_API_KEY=여기에_발급받은_키_입력

git clone https://github.com/geoje/MapleTool.git
cd MapleTool
command -v fnm >/dev/null 2>&1 || curl -fsSL https://fnm.vercel.app/install | bash
FNM_BIN="$(command -v fnm || echo "$HOME/.local/share/fnm/fnm")"
eval "$("$FNM_BIN" env)"
"$FNM_BIN" install
"$FNM_BIN" use
echo "NEXON_API_KEY=$NEXON_API_KEY" > proxy/.env
(cd proxy && npm install && npm run dev &)
cd frontend && npm install && npm run dev
```

## 🚀 서버 실행

1. 이 저장소를 **Fork**합니다.
2. Fork한 저장소의 **Settings → Secrets and variables → Actions**에 아래 값을 등록합니다.

| Secret | 설명 |
|---|---|
| `HOST` | 배포 서버 주소 |
| `USERNAME` | 배포 서버 SSH 계정 |
| `KEY` | 배포 서버 SSH 개인키 |
| `NEXON_API_KEY` | Nexon Open API 키 |

3. 배포 서버(Docker 설치 완료)에서 Swarm 모드를 활성화합니다.

```bash
docker swarm init
```

4. Fork한 저장소의 **Actions → Deploy** 워크플로우에서 **Run workflow**를 눌러 수동으로 배포합니다.

## ⚰️ 메이플 도구 (MAR 2023 ~ SEP 2026)

**메이플 유니온 배치기**를 대체하기 위해 시작한 프로젝트입니다.

오버엔지니어링을 제거하며 AI와 함께 개발하기 위해 프레임워들을 교체하였습니다.

프론트엔드는 **Chakra UI**에서 **Shadcn UI**로, 백엔드는 **Spring Boot**에서 **Hono**로 마이그레이션했습니다.

<table>
<tr>
  <th align="center">🏠 홈</th>
  <th align="center">🔨 강화</th>
  <th align="center">🔮 유니온 아티팩트</th>
  <th align="center">💎 보스 수익</th>
</tr>
<tr>
  <td><img src="https://github.com/user-attachments/assets/9c064dc4-dcdd-4fca-a9ae-75a238c3d83c" /></td>
  <td><img src="https://github.com/user-attachments/assets/e17bd1a8-9b81-4f88-abd9-1cfe2627cfcd" /></td>
  <td><img src="https://github.com/user-attachments/assets/1fa84d47-bad8-4980-afcf-213c99f9530e" /></td>
  <td><img src="https://github.com/user-attachments/assets/1d032405-ad5b-4054-9b55-d3a0eba1b14f" /></td>
</tr>
</table>

## ⚰️ 메이플 유니온 배치기 (NOV 2022 ~ MAR 2023)

**메이플 도구**가 만들어지기 전, 이 저장소에서 가장 먼저 시작된 프로젝트입니다.

**HTML, CSS, JavaScript**만으로 만들어졌고, 유지보수가 너무 어려워져 중단하기로 결정했습니다.

**Nexon Open API**가 공개된 이후, 이 프로젝트를 처음부터 다시 만들기 위해 잠시 멈춰두었습니다.

<table>
<tr>
  <th align="center">배정</th>
  <th align="center">저장</th>
  <th align="center">업데이트</th>
  <th align="center">매뉴얼</th>
  <th align="center">모바일</th>
</tr>
<tr>
  <td><img src="https://github.com/user-attachments/assets/8633ec47-c0ee-4589-8df4-ecdd7e2b190a" /></td>
  <td><img src="https://github.com/user-attachments/assets/d1fb2475-fd63-4c6d-b6ca-3f5390943883" /></td>
  <td><img src="https://github.com/user-attachments/assets/375b1f99-af73-4303-9919-f8c3ca931d63" /></td>
  <td><img src="https://github.com/user-attachments/assets/791ab98f-3dc6-4e06-947b-f92d33fb39db" /></td>
  <td><img src="https://github.com/user-attachments/assets/aa9dbd8f-9fdb-4e08-8e89-6d0e0bffd9c5" /></td>
</tr>
</table>
