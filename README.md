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
  - [Models](#models)
  - [Routes](#routes)
  - [Authentication](#authentication)
  - [Notes](#notes)
  - [Networks](#networks)
  - [Documents](#documents)
  - [Credentials](#credential)
  - [Credit cards](#credit-cards)
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

<!-- Models -->

## Models

### Users _`users`_

- `id`: A unique identifier for each user. `serial4`
- `username`: The user's username. `text`
- `email`: The user's email. An email may only be registered once. `text`
- `password`: The user's password. `text`
- `created_at`: The date and time when the user was created. `timestamp`

### Notes _`notes`_

- `id`: A unique identifier for each note. `serial4`
- `label`: A label for the note. Each user can only have one note with the same label. `text`
- `content`: The content of the note. `text`
- `user_id`: The user that created the note. `int4`
- `created_at`: The date and time when the note was created. `timestamp`

### Networks _`networks`_

- `id`: A unique identifier for each network. `serial4`
- `label`: A label for the network. Each user can only have one network with the same label. `text`
- `name`: The name of the network. `text`
- `password`: The network password. The inserted data is encrypted, and decrypted upon query. `text`
- `user_id`: The user that created the network. `int4`
- `created_at`: The date and time when the network was created. `timestamp`

### Documents _`documents`_

- `id`: A unique identifier for each document. `serial4`
- `label`: A label for the document. Each user can only have one document with the same label. `text`
- `full_name`: The full name found on the document. `text`
- `emission_date`: The emission date of the document. The date must follow the format **_DD/MM/YYYY_**.`varhchar(10)`
- `exp_date`: The expiration date of the document. The date must follow the format **_DD/MM/YYYY_**.`varhchar(10)`
- `registry_number` : The registry number of the document. `text`
- `issuing_agency`: The issuing agency of the document. `text`
- `type`: The document'd type. Must either be '**CNH**' or '**RG**'. `enum`
- `user_id`: The user that created the document. `int4`
- `created_at`: The date and time when the document was created. `timestamp`

### Credentials _`credentials`_

- `id`: A unique identifier for each credential. `serial4`
- `label`: A label for the credential. Each user can only have one credential with the same label. `text`
- `username`: The username of the credential. `text`
- `password`: The password of the credential. The inserted data is encrypted, and decrypted upon query. ` text``text `
- `url`: The URL of the credential. `text`
- `user_id`: The user that created the credential. `int4`
- `created_at`: The date and time when the credential was created. `timestamp`

### Credit cards _`credit_cards`_

- `id`: A unique identifier for each credit card. `serial4`
- `label`: A label for the credit card. Each user can only have one credit card with the same label. `text`
- `number`: The credit card number. `varhchar(16)`
- `exp_date`: The credit card expiration date. The date must follow the format **MM/YY**.`varhchar(5)`
- `cvc`: The credit card CVC. The inserted data is encrypted, and decrypted upon query. `text`
- `password`: The credit card password. The inserted data is encrypted, and decrypted upon query. `text`
- `owner`: The credit card owner. `text`
- `is_virtual`: Whether the credit card is virtual or not. `bool`
- `type`: The credit card type. Must either be '**CREDIT**', '**DEBIT**' or '**BOTH**'. `enum`
- `user_id`: The user that created the credit card. `int4`
- `created_at`: The date and time when the credit card was created. `timestamp`

<!-- Routes -->

## Routes

### [Authentication](#authentication) _`/auth`_

- [Register](#---register)
- [Sign In](#---sign-in)

### [Notes](#notes) _`/notes`_

- [Create a note](#---create-a-note)
- [Search all notes](#---search-all-notes)
- [Search a note](#---search-a-note)
- [Delete a note](#---delete-a-note)

### [Networks](#networks) _`/networks`_

- [Create a network](#---create-a-network)
- [Search all networks](#---search-all-networks)
- [Search a network](#---search-a-network)
- [Delete a network](#---delete-a-network)

### [Documents](#documents) _`/documents`_

- [Create a document](#---create-a-document)
- [Search all documents](#---search-all-documents)
- [Search a document](#---search-a-document)
- [Delete a document](#---delete-a-document)

### [Credentials](#credentials) _`/credentials`_

- [Create a credential](#---create-a-credential)
- [Search all credentials](#---search-all-credentials)
- [Search a credential](#---search-a-credential)
- [Delete a credential](#---delete-a-credential)

### [Credit cards](#credit-cards) _`/credit-cards`_

- [Create a credit-card](#---create-a-credit-card)
- [Search all credit cards](#---search-all-credit-cards)
- [Search a credit card](#---search-a-credit-card)
- [Delete a credit card](#---delete-a-credit-card)

## Authentication

### &nbsp; ‣ &nbsp; Register

###### &nbsp; &nbsp; POST _`/auth/register`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "username": "johndoe",
  "email": "john_doe@gmail.com",
  "password": "123456789"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description        |          Properties           |
| :---------: | :----------------------: | :---------------------------: |
|   **201**   |         Created          |          `data: {}`           |
|   **409**   | Email already registered | `error: { message, details }` |
|   **422**   |      Invalid Input       | `error: { message, details }` |
|   **500**   |  Internal Server Error   | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Sign in

###### &nbsp; &nbsp; POST _`/auth/sign-in`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "email": "john_doe@gmail.com",
  "password": "123456789"
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
|   **200**   |          OK           |       `data: { token }`       |
|   **403**   |   Invalid password    | `error: { message, details }` |
|   **404**   |    User not found     | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Notes

### &nbsp; ‣ &nbsp; Create a note

###### &nbsp; &nbsp; POST _`/notes/create`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "label": "First note",
  "content": "This is a test! Lorem ipsum dolor sit amet,
consectetur adipiscing elit, sed do eiusmod tempor incididunt."
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
|   **400**   |    Missing headers    | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search all notes

###### &nbsp; &nbsp; GET _`/notes/all`_

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
|   **200**   |          OK           |      `data: { notes[] }`      |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |     Invalid token     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search a note

###### &nbsp; &nbsp; GET _`/notes/:id`_

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
|   **200**   |          OK           |       `data: { notes }`       |
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Delete a note

###### &nbsp; &nbsp; DELETE _`/notes/:id/delete`_

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
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Networks

### &nbsp; ‣ &nbsp; Create a network

###### &nbsp; &nbsp; POST _`/networks/create`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "label": "House network",
  "name": "Main",
  "password": "123456"
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
|   **400**   |    Missing headers    | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search all networks

###### &nbsp; &nbsp; GET _`/networks/all`_

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
|   **200**   |          OK           |    `data: { networks[] }`     |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |     Invalid token     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search a note

###### &nbsp; &nbsp; GET _`/networks/:id`_

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
|   **200**   |          OK           |     `data: { networks }`      |
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Delete a note

###### &nbsp; &nbsp; DELETE _`/networks/:id/delete`_

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
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Documents

### &nbsp; ‣ &nbsp; Create a document

###### &nbsp; &nbsp; POST _`/documents/create`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "label": "First Document",
  "full_name": "John Doe",
  "emission_date": "03/06/2020",
  "exp_date": "12/05/2025",
  "registry_number": "132456",
  "issuing_agency": "sass",
  "type": "RG"
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
|   **400**   |    Missing headers    | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search all documents

###### &nbsp; &nbsp; GET _`/documents/all`_

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
|   **200**   |          OK           |    `data: { documents[] }`    |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |     Invalid token     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search a note

###### &nbsp; &nbsp; GET _`/documents/:id`_

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
|   **200**   |          OK           |     `data: { documents }`     |
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Delete a note

###### &nbsp; &nbsp; DELETE _`/documents/:id/delete`_

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
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

<!-- Contact & Study Playlist -->

## Credentials

### &nbsp; ‣ &nbsp; Create a credential

###### &nbsp; &nbsp; POST _`/credentials/create`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "label": "First credential",
  "username": "JohnDoe",
  "url": "https://facebook.com",
  "password": "123456789"
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
|   **400**   |    Missing headers    | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search all credentials

###### &nbsp; &nbsp; GET _`/credentials/all`_

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
|   **200**   |          OK           |   `data: { credentials[] }`   |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |     Invalid token     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search a note

###### &nbsp; &nbsp; GET _`/credentials/:id`_

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
|   **200**   |          OK           |    `data: { credentials }`    |
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Delete a note

###### &nbsp; &nbsp; DELETE _`/credentials/:id/delete`_

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
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

<!-- Contact & Study Playlist -->

## Credit cards

### &nbsp; ‣ &nbsp; Create a credit_card

###### &nbsp; &nbsp; POST _`/credit-cards/create`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "label": "First credit card",
  "number": "1234123412341324",
  "exp_date": "08/25",
  "password": "1234",
  "cvc": "123",
  "owner": "JOHN DOE",
  "is_virtual": false,
  "type": "BOTH"
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
|   **400**   |    Missing headers    | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search all credit_cards

###### &nbsp; &nbsp; GET _`/credit-cards/all`_

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
|   **200**   |          OK           |  `data: { credit_cards[] }`   |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |     Invalid token     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Search a note

###### &nbsp; &nbsp; GET _`/credit-cards/:id`_

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
|   **200**   |          OK           |   `data: { credit_cards }`    |
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Delete a note

###### &nbsp; &nbsp; DELETE _`/credit-cards/:id/delete`_

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
|   **400**   |  Invalid parameters   | `error: { message, details }` |
|   **401**   |     Missing token     | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **409**   |       Conflict        | `error: { message, details }` |
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
