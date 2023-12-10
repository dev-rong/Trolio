<div>
<a href="https://trolio.netlify.app">
  <img src="/public/trolio_logo_black.png" alt="trolio logo" align="right" height="100" />
</a> 
<h1>Trolio</h1>
</div>

![PreRelease](https://img.shields.io/badge/pre--release-v0.1.3--alpha-yellow)
![NodeJS](https://img.shields.io/badge/node.js-v14.19.0-green?logo=node.js)
![NPM](https://img.shields.io/badge/npm-v6.14.16-blue?logo=npm)

[Trolio](https://trolio.netlify.app) is a dashboard and portfolio web app for freelance media translators/QCers which fetches data using Airtable API.
On the dashboard, you can compare the ratio of income, work form, platform, etc visualized with graphs and charts by the specific periods you choose while you can also organize and search your translation/QC works on the portfolio. For now, Trolio is a demo version which makes API call to get data from a temporary Airtable base.

[트롤리오](https://trolio.netlify.app)는 프리랜서 영상번역/감수 작가를 위한 대시보드, 포트폴리오 웹앱으로 에어테이블 API를 이용해 데이터를 받아와 시각화합니다.
대시보드 메뉴에서는 작업물의 유형, 플랫폼, 수입 등을 선택한 기간별로 비교할 수 있으며 포트폴리오 메뉴에서는 작업물을 정리 및 검색할 수 있습니다. 현재는 에어테이블 임시 데이터를 불러오는 데모 버전으로 데이터가 채워진 상태는 홈페이지에서만 확인 가능합니다.

![image](https://user-images.githubusercontent.com/96870030/229689022-b8c991a4-b679-4a2c-885c-c323dea6000b.png)

## Table Of Content
- [Links](#links)
- [Installation](#installation)
- [Functions](#functions)
- [Stacks](#stacks)

## Links
🔗 [Trolio(트롤리오) 바로가기](https://trolio.netlify.app)  

✍️ [Trolio(트롤리오) 개발 후기](https://dev-rong.github.io/blog/trolio-review)

## Installation
```bash
npm install
npm start
```

## Functions
### Dashboard
### 대시보드
Compare the figures of job type, category, work form, total income, total working hours, total number of works, total running times, yealy income by selecting specific periods. You can easily check the difference with visualized charts and graphs. Button A is for selecting one period, button A/B is for selecting and comparing two periods.


특정 날짜를 입력 혹은 기간을 선택하여 작업 유형, 카테고리, 작업물 형태, 총 수입, 총 작업 시간, 총 작업물 수, 총 러닝타임, 연 수입을 차트와 그래프로 확인 가능합니다. A 버튼은 기간을 1개 설정, A/B 버튼은 기간을 2개 설정합니다. 

https://user-images.githubusercontent.com/96870030/229748814-ca7b1ba7-9f9f-47f7-94be-b84eb0d1efd9.mp4 

<space><space>
### Portfolio
### 포트폴리오
- Organize and check out translation and QC works with details and posters.
- 번역/감수 작업물의 포스터를 목록화하며 클릭 시 상세 정보 확인이 가능합니다.

https://user-images.githubusercontent.com/96870030/229750550-358306e3-488e-41e0-9c9f-c2610bc28cf1.mp4



<space><space>
- Filter works by its job type, work form, category, platform.
- 작업 유형, 작업물 형식, 카테고리, 플랫폼을 기준으로 작업물 필터링이 가능합니다.

https://user-images.githubusercontent.com/96870030/229752188-3d906048-ca47-4d20-b491-0a9d4aa1a171.mp4


<space><space>
- Search works by its title.
- 작업물의 제목으로 검색이 가능합니다.


https://user-images.githubusercontent.com/96870030/229753509-ae3f1c3b-57b2-40fc-85ae-613b99f36700.mp4



## Stacks
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="" height="80"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="/public/Airtablelogo.webp" height="80"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="/public/chartjslogo.avif" height="80"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://images.velog.io/images/vi2920va/post/9b15f05e-6a45-4490-9003-2250397ecf58/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png" alt="" height="80"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="/public/githublogo.png" height="80"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="/public/netlifylogo.png" height="80"/> 
