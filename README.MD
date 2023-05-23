# Instaclone

Instaclone Backend

## User:

- [x] 계정 만들기
- [x] 프로필 보기
- [x] 로그인
- [] 프로필 수정
- [] 팔로우 하기
- [] 언팔하기
- [] 프로필 사진 바꾸기

# 의문점

dotenv는 환경변수를 .env파일에 저장하고 process.env로 로드하는 의존성 모듈이다.

npm i dotenv

2. dotenv를 제일 먼저 실행되는 자바스크립트 파일
   의 모든 것 위에서 즉시 실행시키기 => 왜 맨위에서 읽어야하지???
   db.js
   export const db_host = process.env.DB_HOST;
   export const db_user = process.env.DB_USER;

import dotenv from "dotenv";
import { db_host, db_user, db_pass } from "./db.js";

dotenv.config();
이런식으로 되어있으면 db.js 파일이 process.env에 접근했을 시점에는 환경 변수가 설정이 되어 있지 않음
dotenv.config() 함수가 db.js 파일이 임포트 된 이후에 호출되었기 때문

server.js 맨 위에
require('dotenv').config(); // import "dotenv/config" => ES6
dotenv.config(); // .env 파일을 읽어온다.

env가 아닌 다른 경로에 있는 파일에 환경 변수를 저장해놨다면 config() 함수를 호출 시 path 옵션을 넘기면 된다
require("dotenv").config({ path: "/path/to/.env.local" });

다른 곳에서도 다시 import 할 필요가 없다, 모든 곳에서 사용가능해짐 => 어떤 원리지??

도메인에 따라 분할 정복을 했음(movies, users, comments, 등등)
왜 ??

typeDefs, queries, mutations export default로 해놔야 나중에 loadedTypes, mergeTypeDefs 이 때
문제가 없다

- 에러
  const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`)
  queries,mutations 여기 띄어쓰기 조심
  붙어있어야 콘솔로그가 찍힌다

findFirst 때에는 OR 가능
findUnique에는 못 씀

---
