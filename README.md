# 서비스 종료 (2023/09/30)
안녕하세요, 유니온 배치기 개발자 입니다. 메이플 유니온 배치기 서비스를 이용해주시는 모든 분께 정말 감사드립니다.<br>
2023년 추석, 서비스가 이상함을 인지하여 업데이트를 진행하지 않고 서비스를 종료 결정 하였습니다.<br>
데이터를 가져오던 mpale.gg 사이트의 캐릭터 요청 방식이 변경되어 이 프로젝트의 캐릭터 정보 요청 로직을 변경해야 하는 상황입니다.<br>
변경되어야 할 부분: https://github.com/geoje/MapleUnionTiler/blob/master/server.js#L128

웹 개발 공부를 막 시작하며 사용했던 오래된 기술을 수정해야 하기 때문에 Hotfix를 하지 않고, 최근 사용 중인 Next.js 13 이상 버전을 사용하여 더 나은 서비스로 돌아오려고 합니다.<br>
과거 개발 당시 여러 피드백을 통해 영역 선택이 아닌 점령 효과를 골라서 배치 방법을 알려주도록 변경하는 등 개선 사항 아이디어를 보유하고 있습니다.<br>
개발 완료 시점을 특정 지을 수는 없으며 최소 몇개월 이상으로 예측됩니다. 현재 Repository에서 develop Branch를 생성하여 개발을 진행할 것입니다.<br>
개발 완료 후 출시 때 메이플 인벤 팁과 노하우 게시판에서 다시 한번 찾아뵙도록 하겠습니다.

감사합니다.

# 메이플 유니온 배치기 https://ygh.kr/maple/

**메이플 스토리** 게임의 **유니온 시스템**을 보다 **편리하게 이용**할 수 있게 도와주는 웹사이트 입니다.
<br><br>

# 개발 환경

- `Node.js v14.17.3`
- `pm2`
  <br><br>

# 일반적인 동작

메이플 스토리 공식 홈페이지에서 캐릭터 정보를 들고와서 원하는 공간을 선택한 뒤 실행하면 타일을 어떻게 배치해야할지 알려줍니다.

![](public/image/readme/Normal.gif)
<br><br>

# 사용자 지정 조각

자신이 가지고 있지 않은 캐릭터라도 배치를 해보고 싶다면 우측에 조각을 클릭하면 됩니다.

> #### 원래대로
>
> 자신의 캐릭터의 정보만으로 조각을 되돌리고 싶다면 `리셋` 버튼을 누르면 됩니다.

![](public/image/readme/Custom.gif)
<br><br>

# 저장

웹페이지를 다시 방문할 때 전에 사용한 캐릭터들 정보와 선택한 공간을 불러와줍니다.

![](public/image/readme/Save.gif)
<br><br>

# 동기화

캐릭터 정보가 오래되어 정확하지 않다면 회전 화살표 모양을 눌러 동기화 시킬 수 있습니다.

![](public/image/readme/Sync.gif)
<br><br>

# 모바일

스마트폰에서도 사용가능하도록 CSS만으로 반응형 웹이 구현되어 PC와 동일하게 사용가능 합니다.

![](public/image/readme/Mobile.gif)
<br><br>

# 데이터 베이스 생성 (통계용)

##### sql

```sql
CREATE DATABASE maple DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
SET GLOBAL validate_password.policy=LOW;
CREATE USER maple@localhost identified WITH mysql_native_password BY 'maplemaple';
GRANT ALL PRIVILEGES ON maple.* TO maple@localhost;
FLUSH PRIVILEGES;
```

<br><br>

# 테이블 생성

##### sql

```sql
CREATE TABLE `maple`.`mut_log` (
  `date` DATE NOT NULL,
  `visit` INT NULL,
  `apply` INT NULL,
  `sync` INT NULL,
  PRIMARY KEY (`date`),
  INDEX `mut_log_date_idx` (`date` DESC) VISIBLE);
```
