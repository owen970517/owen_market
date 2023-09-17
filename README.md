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

- 판매 게시물 
    - 게시물 올릴 시 사진, 제목, 지역, 상품명, 가격을 작성 
    - 지역 버튼을 누르면 해당 지역에서 파는 상품만 보여주도록 filter 기능을 추가하였음
    - 각 상품 클릭 시 상세 페이지로 이동
    - 자신이 올린 상품일 경우 상품 수정 및 판매 완료로 변경 가능 

- 장바구니 
    - 장바구니에는 자신이 저장한 상품과 총 가격을 보여줌 
    - 상세 페이지에서 장바구니 담기 클릭 시 장바구니에 저장

- 검색 시스템
    - 원하는 상품 검색 가능

## 개선한 점  

- firebase를 typescript로 개선
- 기존 form-input을 useForm hook을 사용하여 개선
- redux-toolkit을 사용하여 상태 관리
- react-helmet-async를 사용하여 웹 사이트 타이틀 변경
- React.lazy를 사용하여 라우터 코드 분할로 성능 개선 
- react-lazy-load-image 라이브러리를 사용하여 이미지 로딩 개선 
