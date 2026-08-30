# Lin X

My personal portfolio page, styled after X (formerly Twitter). The stats under the bio (repositories, followers, join date) are fetched live from the GitHub REST API on page load, not hardcoded, and it features two "posts" showing the projects I am proudest of so far.

Not affiliated with X Corp. It is just a format I liked for showing real work instead of a plain list of links.

## Featured projects

- **Verification Engine**: an AWS-native platform letting South African shareholders claim unpaid dividends and lost shares without paperwork. Cognito, Rekognition, Textract, Step Functions, all defined in CDK. [Live](https://master.ds1rwbch2twux.amplifyapp.com) · [Source](https://github.com/LindokuhleChili/verification-engine)
- **CompuClass**: a Learning Management System with a 3D Windows environment simulator, built with a 6 person team I led. React Native, Supabase. [Source](https://github.com/Channel-Zero/Compuclass-v1.5)

## Running it locally

```bash
npm install
npm run dev
```

## Stack

React, JavaScript, Vite, plain CSS. Deployed on AWS Amplify Hosting, connected straight to this repository so every push to `main` rebuilds and redeploys automatically.
