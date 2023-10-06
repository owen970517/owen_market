# 당근마켓 클론코딩

## 설치 방법 및 실행

- git clone https://github.com/owen970517/carrot_clone.git
- npm install
- npm start

## 화면 구성

|        로그인/회원가입    |       프로필 수정     |
| :-------------------------: | :-----------------------------------------------: |
| <img width="400" height='600' src="https://github.com/owen970517/carrot_clone/assets/75247323/947e13b2-6779-4a62-864a-97f5d1431876" /> | <img width="400" height='600' src="https://github.com/owen970517/carrot_clone/assets/75247323/5945cda6-a3db-469b-aea5-dc23999b118f" />|


|          상세페이지, 수정             |     채팅, 장바구니   |
| :----------------------------: | :-----------------------------------: |
| <img width="400" height='600' src="https://github.com/owen970517/carrot_clone/assets/75247323/e625fc75-df62-4e87-9e05-94147d69792a"> | <img width="400" height='600' src="https://github.com/owen970517/carrot_clone/assets/75247323/79682c6c-dc57-4717-9b2c-9a2121cf266b"> |

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

## 기능 구현 

- 로그인 
    - firebase Authentication을 사용 

- 프로필
    - 화면에서 닉네임을 누르면 내 정보 수정 페이지로 이동하고 정보를 수정할 수 있도록 구현 
    - 프로필 사진 변경
    - 로그인 한 유저가 판매중인 상품, 판매 완료한 상품 볼 수 있도록 구현

- 메인 페이지
    - 무한 스크롤
    - 지역 버튼을 누르면 해당 지역에서 파는 상품만 보여주도록 filter 기능을 추가
    - 각 상품 클릭 시 상세 페이지로 이동

- 상세 페이지
    - 해당 상품에 대한 상세 정보를 보여줌
    - 상품 판매자와 현재 로그인 된 아이디가 같을 경우 수정, 판매완료 버튼 보여줌
    - 다를 경우 채팅, 장바구니 담기 버튼을 보여줌

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
            https://github.com/owen970517/carrot_clone/blob/47bbc85eb9507df782ad0d9008b6188817f27b99/src/Components/auth/Profile.tsx#L39-L50
        </ul>
        <ul>
            https://github.com/owen970517/carrot_clone/blob/39f4c342597a283f5e9c65a8354e060a0ff0e440/src/Components/auth/Profile.tsx#L97-L103
        </ul>
    </div>
</details>

### 2. 닉네임 수정 시 기존 채팅방의 닉네임이 수정되지 않아서, 속한 채팅방이 보이지 않는 현상 개선
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/carrot_clone/blob/39f4c342597a283f5e9c65a8354e060a0ff0e440/src/Components/auth/Profile.tsx#L52-L65
        </ul>
        <ul>
            https://github.com/owen970517/carrot_clone/blob/39f4c342597a283f5e9c65a8354e060a0ff0e440/src/Components/auth/Profile.tsx#L97-L103
        </ul>
    </div>
</details>

### 3. Lighthouse properly-size-images 개선

- 원인 : 실제 이미지의 사이즈가 렌더링되는 이미지의 사이즈와 차이가 많이 날 경우 발생
- 개선 방법 : browser-image-compression 라이브러리 사용하여 이미지 사이즈 및 크기 압축
- 이미지 압축 코드 custom hook으로 구현 
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/carrot_clone/blob/c908db800418ab35f47eb75da43b0c68858f07f7/src/hooks/useCompressImage.tsx#L1-L14
        </ul>
    </div>
</details>

- 실제 사용 코드
<details>
    <summary><b>👈코드 보기</b></summary>
    <div markdown="1">
        <ul>
            https://github.com/owen970517/carrot_clone/blob/c908db800418ab35f47eb75da43b0c68858f07f7/src/Components/products/AddProduct.tsx#L29-L49
        </ul>
    </div>
</details>



## 개선한 점  

- firebase를 typescript로 개선
- 기존 form-input을 useForm hook을 사용하여 개선
- redux-toolkit을 사용하여 상태 관리
- react-helmet-async를 사용하여 웹 사이트 타이틀 변경
- React.lazy를 사용하여 라우터 코드 분할로 성능 개선 
- react-lazy-load-image 라이브러리를 사용하여 이미지 로딩 개선

