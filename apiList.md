# API List

## authRouter
- POST /signup
- POST /login
- POST /logout
- POST /send/otp
- POST /verify/otp
- POST /reset/password

## profileRouter
- Get /profile/view
- PATCH /profile/edit
- PATCH /profile/password
- PATCH /profile/password/change

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform