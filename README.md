<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/NivaldoFarias/drivenpass-api">
    <img src="./.github/drivenpass-logo.png" alt="DrivenPass Logo" width="110">
  </a>

<h3 align="center">DrivenPass API</h3>
  <h6>WIP</h6>
  <p>
    Back end Development Project <strong>{19ᵗʰ}</strong>
    <br />
    <a href="https://github.com/NivaldoFarias/drivenpass-api/tree/main/src"><strong>Browse TypeScript code»</strong></a>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  
</div>

<!-- Table of Contents -->

# Table of Contents

- [Getting Started](#getting-started)
- [API Reference](#api-reference)
  - [Routes](#routes)
  - [Cards](#cards)
  - [Payments](#payments)
  - [Recharges](#recharges)
- [Contact & Study Playlist](#contact--study-playlist)

<!-- Getting Started -->

# Getting Started

This Api can be used in two different ways: by cloning the project or by using your preferred client, such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/).

To clone the project, run the following command:

```git
git clone https://github.com/NivaldoFarias/drivenpass-api.git
```

Then, navigate to the project folder and run the following command:

```git
npm install
```

Finally, start the server:

```git
npm start
```

You can now access the API's endpoints by navigating to `http://localhost:5000/` or to the deployed URL `https:/drivenpass-api-project.herokuapp.com/`. If needed, import one of the provided [Request Collections](https://github.com/NivaldoFarias/drivenpass-api/tree/main/.github) files into your preferred client and test the endpoints!

###### ps.: Highly recommend using the request collections to test the API.

<!-- API Reference -->

# API Reference

In this section, you will find the API's endpoints and their respective descriptions, along with the request and response examples. All data is sent and received as JSON.

<!-- Routes -->

## Routes

### [Authentication](#authentication) _`/auth`_

- [Register](#---register)
- [Sign In](#---sign-in)

### [Notes](#notes) _`/notes`_

- [Create a new note](#---create-a-new-note)
- [Search all notes](#---search-all-notes)
- [Search a note](#---search-a-note)
- [Delete a note](#---delete-a-note)

### [Networks](#networks) _`/networks`_

- [Create a new network](#---create-a-new-network)
- [Search all networks](#---search-all-networks)
- [Search a network](#---search-a-network)
- [Delete a network](#---delete-a-network)

### [Documents](#documents) _`/documents`_

- [Create a new document](#---create-a-new-document)
- [Search all documents](#---search-all-documents)
- [Search a document](#---search-a-document)
- [Delete a document](#---delete-a-document)

### [Credentials](#credentials) _`/credentials`_

- [Create a new credential](#---create-a-new-credential)
- [Search all credentials](#---search-all-credentials)
- [Search a credential](#---search-a-credential)
- [Delete a credential](#---delete-a-credential)

### [Credit cards](#credit-cards) _`/credit-cards`_

- [Create a new credit-card](#---create-a-new-credit-card)
- [Search all credit cards](#---search-all-credit-cards)
- [Search a credit-card](#---search-a-credit-card)
- [Delete a credit-card](#---delete-a-credit-card)

## Notes

### &nbsp; ‣ &nbsp; Create a note

###### &nbsp; &nbsp; POST _`/notes/create`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "label": "First note",
  "content": "This is a test! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **400**   |    Missing Headers    | `error: { message, details }` |
|   **401**   |    Unauthenticated    | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search a card

###### &nbsp; &nbsp; GET _`/cards/all`_

### &nbsp; ☰ &nbsp; Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Block a card

###### &nbsp; &nbsp; POST _`/cards/block`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": "3",
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Unblock a card

###### &nbsp; &nbsp; POST _`/cards/unblock`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": "3",
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Payments

### &nbsp; ‣ &nbsp; New payment

###### &nbsp; &nbsp; POST _`/payments/new`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "card": {
    "id": 3,
    "password": "1234"
  },
  "businessId": 5,
  "amount": 1000
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Recharges

### &nbsp; ‣ &nbsp; New recharge

###### &nbsp; &nbsp; POST _`/recharges/new`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": 3,
  "amount": 1000
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "x-api-key": "this-is-a-needlessly-long-placeholder-api-key"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **400**   |    Missing Headers    | `error: { message, details }` |
|   **401**   |    Unauthenticated    | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

<!-- Contact & Study Playlist -->

# Contact & Study Playlist

In the following Youtube link I included all Youtube content I used or refered to while studying for this project. Hope you enjoy it!

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Slack][slack-shield]][slack-url]
[![Youtube][youtube-shield]][youtube-url]

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/nivaldofarias/
[slack-shield]: https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white
[slack-url]: https://driventurmas.slack.com/team/U02T6V2D8D8/
[youtube-shield]: https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white
[youtube-url]: https://youtube.com/playlist?list=PLoZj33I2-ANTWqU331l3ZGlZV8I7rr5ZN
