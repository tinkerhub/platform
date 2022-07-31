[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://tinkerhub.org/">
    <img src="https://avatars.githubusercontent.com/u/45253922?s=400&u=bb1a9f5aa6706a6af63b653652a13d0f8a0f36fc&v=4" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Tinkerhub Platform</h3>

  <p align="center">
    Where everything for Tinkerhub happens!!!
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Tinkerhub Platform is a community built platform for Tinkers to conduct there activities.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [NestJS](https://nestjs.com/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Next.js](https://nextjs.org/)
- [ChakraUI](https://chakra-ui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You need to install

1. [Node v16](https://nodejs.org/en/)
2. [pnpm](https://pnpm.io/)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/tinkerhub/platform.git
   ```

2. Install all the NPM packages all the applications.

   > We are using PNPM workspace and turborepo to manage the applications in monorepo.

   ```sh
   pnpm install
   ```

3. Copy the `.env.example` for each applications to `.env` in the same directory and fill the values required

4. Install new dependencies to the project

   ```sh
   pnpm add "package-name" --filter "workspace-name"
   ```

5. Start the api dev server and open `http://localhost:8000`

   ```sh
   pnpm --filter api dev
   ```

6. Start the web application dev server and open `http://localhost:3000`

   ```sh
   pnpm --filter web dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation with Docker compose

| Not ready yet. Coming soon

1. You need to install

- [Docker](https://www.docker.com/) / [Podman](https://podman.io/)
- [Docker Compose](https://docs.docker.com/compose/)

2. Run

```sh
docker-compose up
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Command Center

<details>

  <summary>
  All the commands for applications can be executed from the root directory using PNPM Workspace and Turborepo.
  </summary>

1. Web application PNPM commands

   ```sh
     pnpm --filter web <pnpm options>
   ```

2. API Server PNPM commands

   ```sh
     pnpm --filter api <pnpm options>
   ```

3. Turbo Pipeline Commands

   ```sh
     pnpm turbo run <pipeline_action_1> <pipeline_action_2>
   ```

### Misc Commands

1. Run lint

   ```sh
     pnpm lint
   ```

2. Run lint with autofixable fixes

   ```sh
     pnpm lint-fix
   ```

</details>

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/tinkerhub/platform.svg?style=for-the-badge
[contributors-url]: https://github.com/tinkerhub/platform/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tinkerhub/platform.svg?style=for-the-badge
[forks-url]: https://github.com/tinkerhub/platform/network/members
[stars-shield]: https://img.shields.io/github/stars/tinkerhub/platform.svg?style=for-the-badge
[stars-url]: https://github.com/tinkerhub/platform/stargazers
[issues-shield]: https://img.shields.io/github/issues/tinkerhub/platform.svg?style=for-the-badge
[issues-url]: https://github.com/tinkerhub/platform/issues
[license-shield]: https://img.shields.io/github/license/tinkerhub/platform.svg?style=for-the-badge
[license-url]: https://github.com/tinkerhub/platform/blob/main/LICENCE
