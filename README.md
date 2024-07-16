# RealMoment

[RealMement 바로가기](https://real-moment.kro.kr/)
|Home|
|------|
|![Home](https://github.com/user-attachments/assets/9c79ad4d-cd4d-4cc2-8bf6-0562ca638495)|
| Login | SginUp |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| ![Home](https://github.com/user-attachments/assets/9c79ad4d-cd4d-4cc2-8bf6-0562ca638495)| *쇼핑몰 사이트를 처음 열 때 나오는 메인 페이지로 홍보 이미지와 홍보할 상품들이 나오도록 제작 |
| ![loginPage](https://github.com/user-attachments/assets/f160fb25-bd58-456d-8a6d-66545fdd45b8) | *로그인 페이지로 비밀번호 유효성 검사를 진행하고 아이디와 비밀번호를 제출할 수 있게 제작하고, 서버에서 해당 아이디와 비밀번호가 존재하는지 확인하도록 구현 *아이디와 비밀번호가 일치했다면 서버에서 토큰 값과 아이디 값을 가져와 쿠키에 저장 *아이디 값은 로그인이 필요한 페이지에 대한 값을 호출할 때 사용하고, 토큰은 로그인 상태를 유지하기 위해 사용함 |
| ![sginupPage](https://github.com/user-attachments/assets/268890c6-9cc3-4c79-9d8b-a926f9ffdd84) | *회원 가입을 위한 페이지로 입력 값에 맞는 input의 상태(숫자, 문자)를 업데이트할 수 있도록 구현하고, 각각의 대한 유효성 검사를 진행 *아이디가 중복되지 않는지 확인하고, 확인되었다면 input을 비활성화 함 *이메일을 인증하기 위한 타이머, 경고, 진행 상태에 대한 알림 설정 *모든 값을 입력하고 인증이 완료되었다면 값을 제출 |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
