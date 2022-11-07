# 당근마켓 클론코딩

## 설치 방법 및 실행

- git clone https://github.com/owen970517/carrot_clone.git
- npm install
- npm start

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

- 거래 게시물 
    - 게시물 올릴 시 사진, 제목, 지역, 상품명, 가격을 작성 
    - 지역 버튼을 누르면 해당 지역에서 파는 상품만 보여주도록 filter 기능을 추가하였음
    - 각 상품 클릭 시 상세 페이지로 이동

- 장바구니 
    - 장바구니에는 자신이 저장한 상품과 총 가격을 보여줌 
    - 상세 페이지에서 장바구니 담기 클릭 시 장바구니에 저장

- 검색 시스템
    - 원하는 상품 검색 가능

## 힘들었던 점 

- firebase를 typescript로 바꾸는데 좀 어려웠습니다.
- useform hook을 기존 form과 똑같이 type을 지정하는 줄 알았는데 다른 방법이 있다는 것을 알게되었습니다. 
- input file을 typescript로 바꾸는데 어려움을 겪었습니다.
- data filter를 redux로 바꾸는데 어려움을 겪었습니다. 
- react-helmet을 사용했더니 unsafe componentwillmount 에러를 react-helmet-async를 사용하여 해결