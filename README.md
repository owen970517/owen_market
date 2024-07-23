# 오웬 마켓

## 배포 주소 

🔗 https://carrot-clone.vercel.app

## 설치 방법 및 실행

- git clone https://github.com/owen970517/owen_market.git
- npm install
- npm start

## 화면 구성
|                                          회원가입                                                                              |                                                                               로그인                                                                              |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="500" height='300' alt="signin" src="https://github.com/user-attachments/assets/a8e97841-bc5f-4b12-a351-6fea84909aad"> | <img width="500" height='300' alt="signup" src="https://github.com/user-attachments/assets/03d6fe04-e2d7-4837-8df3-27aff19ff8dd"> |

|                                                                                  메인 페이지                                                                                |                                                                               프로필 수정                                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="500" height='300' alt="todo_gif" src="https://github.com/user-attachments/assets/b1eac040-4433-411c-a0b8-adcd34c40e8c" /> | <img width="500" height='300' alt="notfound" src="https://github.com/user-attachments/assets/f01c3d41-202e-4c2f-84f9-58965176eb61"> 

|                                                                                  상품 등록                                                                                 |                                                                               상품 수정                                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="500" height='300' alt="todo_gif" src="https://github.com/user-attachments/assets/de2e5677-8d7b-420e-ac36-75f4318ab3f7" /> | <img width="500" height='300' alt="notfound" src="https://github.com/user-attachments/assets/281d00bd-662e-4781-8049-8dd442801050"> 

|                                                                                  상품 관리                                                                                 |                                                                               검색창                                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="500" height='300' alt="todo_gif" src="https://github.com/user-attachments/assets/c7a8facc-5699-48ee-8721-742209de6f53" /> | <img width="500" height='300' alt="notfound" src="https://github.com/user-attachments/assets/481a4bff-a785-4352-ac24-3a8dc9ca72a5"> 

## 사용한 라이브러리

- ReactJS
- TypeScript 
    - 좋은 자동완성과 안전한 개발을 위해 사용
- FireBase 
    - 무료로 DB와 인증 시스템 사용하기 위해 사용
- styled-components
    - UI 컴포넌트를 작성하기 위해 사용
- react-helmet-async 
    - 브라우저 문서 탭의 타이틀을 변경하기 위해 사용
- react-hook-form (useForm)
    - 효율적인 Form을 구현하기 위해 사용
- react-router-dom
    - 페이지 이동을 위해 사용
- useNavigate
    - 페이지 전환 시 파라미터를 전달하기 위해 사용 
- useParams
    - query string의 매개변수 값을 받아오기 위해 사용 
- redux toolkit
    - 상태관리를 위해 사용 
- react-image-file-resizer
    - 이미지 압축 및 포맷 변환을 위해 사용

## 기능 구현 

- 로그인 / 회원가입
    - firebase Authentication을 사용 

- 프로필
    - 화면에서 닉네임을 누르면 내 정보 수정 페이지로 이동하고 정보를 수정할 수 있도록 구현 
    - 프로필 사진 변경
    - 로그인 한 유저가 판매중인 상품, 판매 완료한 상품 볼 수 있도록 구현

- 메인 페이지
    - 무한 스크롤
    - select box로 지역 선택 가능
    - 선택한 지역에서 팔고 있는 상품을 볼 수 있도록 구현 

- 상세 페이지
    - 해당 상품에 대한 상세 정보를 보여줌
    - 상품 판매자와 현재 로그인 된 아이디가 같을 경우 수정, 판매완료 버튼 보여줌
    - 다를 경우 채팅, 장바구니 담기 버튼을 보여줌

- 상품 등록 
    - 이미지 최대 10개까지 업로드 가능
    - 시/도 및 시/군/구 선택
    - 제목, 상품명, 가격, 설명 입력 가능 

- 장바구니 
    - 장바구니에는 자신이 담은 상품과 총 가격을 보여줌 
    - 상세 페이지에서 장바구니 담기 클릭 시 장바구니에 저장

- 검색창 
    - 원하는 상품 검색 가능
 
- 채팅
    - firebase를 사용하여 채팅 기능 구현
    - 자신의 채팅 오른쪽, 상대방의 채팅 왼쪽에 보여줌
    - 헤더의 채팅방의 경우에는 자신이 속해있는 모든 채팅방을 보여줌 


## 트러블 슈팅 

### 1. 닉네임 수정 시 firebase 계정의 닉네임은 수정되지만, 그 전에 올렸던 상품들의 닉네임이 수정되지 않는 현상을 개선
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/owen_market/blob/47bbc85eb9507df782ad0d9008b6188817f27b99/src/Components/auth/Profile.tsx#L39-L50
        </ul>
        <ul>
            https://github.com/owen970517/owen_market/blob/39f4c342597a283f5e9c65a8354e060a0ff0e440/src/Components/auth/Profile.tsx#L97-L103
        </ul>
    </div>
</details>

### 2. 닉네임 수정 시 기존 채팅방의 닉네임이 수정되지 않아서, 속한 채팅방이 보이지 않는 현상 개선
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/owen_market/blob/39f4c342597a283f5e9c65a8354e060a0ff0e440/src/Components/auth/Profile.tsx#L52-L65
        </ul>
        <ul>
            https://github.com/owen970517/owen_market/blob/39f4c342597a283f5e9c65a8354e060a0ff0e440/src/Components/auth/Profile.tsx#L97-L103
        </ul>
    </div>
</details>

### 3. Lighthouse 성능 개선

- 원인 : 실제 이미지의 사이즈가 렌더링되는 이미지의 사이즈와 차이가 많이 날 경우 발생
- 개선 방법 : react-image-file-resizer 라이브러리 사용하여 이미지 원하는 크기로 압축 및 포맷 변경 
- 이미지 압축 코드 custom hook으로 구현 
    <details>
        <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
                https://github.com/owen970517/owen_market/blob/6329b77130013278cb5aa1170e8d8e894c984c64/src/hooks/useCompressImage.tsx#L1-L32
            </ul>
        </div>
    </details>

- 상품 등록
    <details>
        <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
                https://github.com/owen970517/owen_market/blob/6329b77130013278cb5aa1170e8d8e894c984c64/src/pages/AddProduct.tsx#L33-L55
            </ul>
        </div>
    </details>

- 프로필 이미지 변경
    <details>
        <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
                https://github.com/owen970517/owen_market/blob/6329b77130013278cb5aa1170e8d8e894c984c64/src/pages/Profile.tsx#L70-L80
            </ul>
        </div>
    </details>

- 상품 수정 
    <details>
        <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
                https://github.com/owen970517/owen_market/blob/6329b77130013278cb5aa1170e8d8e894c984c64/src/pages/ModifyProduct.tsx#L42-L65
            </ul>
        </div>
    </details>

### 4. 상품 제목에 공백, 특수 문자 포함되어 있을 때 상세 페이지로 이동이 안되는 현상 발생

- 원인 : 상세 페이지의 URL은 제목을 쿼리 파라미터로 받아오기 때문에 공백, 쿼리스트링을 사용했을 때 에러 발생 
- 해결 방법 : encodeURIcomponent를 사용하여 제목을 인코딩하여 전달
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/owen_market/blob/de78001b4c5e5f65e495bddf91865178bc67b61c/src/Components/common/ProductItem.tsx#L15-L30
        </ul>
    </div>
</details>