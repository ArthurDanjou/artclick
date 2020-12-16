# ArtClick 🔗

This is my personal URL Shortener.

Hosted version: [**artclick.fr**](https://artclick.fr) *(Soon)*

## Features ✨

- Create an unique short code to redirect to a very long link.
- Caching with Redis to do not duplicate visit counts and to save resources.
- Authentication with AdonisJs to secure the entries.
- Visit Counts to have a few stats

## Tech used ⚙

- AdonisJs (HTTP Server & Authentication)
- Redis (Caching)
- MariaDB (Database)
- Kubernetes + Docker (Deployment) *(Soon)*

## Usage 📚

- Authentication
  - https://artclick.fr/auth/login ➡ Login
  - https://artclick.fr/auth/logout ➡ Logout
- Options
  - https://artclick.fr/options/create ➡ Create a new shortened link
  - https://artclick.fr/options/update ➡ Update a shortened link
  - https://artclick.fr/options/delete ➡ Delete a shortened link
- Links
  - https://artclick.fr/ ➡ Get all links with informations
  - https://artclick.fr/(code) ➡ Redirect to the shortened link's target
  - https://artclick.fr/(code)/count ➡ Get the shortened link's visit count

## Author 👤
➡ Arthur Danjou : Developer
 - Twitter : [@ArthurDanj](https://twitter.com/ArthurDanj)
 - GitHub : [@ArthurDanjou](https://github.com/ArthurDanjou)

## License 📑
Copyright © 2020 - [@ArthurDanj](https://arthurdanjou.fr) \
This project is [MIT](https://github.com/ArthurDanjou/artclick/blob/master/LICENSE) Licensed.
