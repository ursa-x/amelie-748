# amelie-748

[![discord.js](https://img.shields.io/badge/discord.js-v12.2.0-brightgreen)](https://www.npmjs.com/package/discord.js)

> :robot: A classy discord bot for Red Dead Online Gamers, using klasa.js.

### Pre-requisites
- [Node](https://nodejs.org) `v.10.0.0+`
- [nodemon](https://github.com/remy/nodemon) `v2.0.3+`

### Setup

#### Installation

To get started, simply clone the repo and type the following in the repo folder
```
cd ${project-folder}
npm i
npm start
```

#### Starting the bot

Check out [An Idiot's Guide > Getting Started](https://anidiots.guide/getting-started) to get your App Token. Add it and your Owner ID to `secrets.json` file under `src/lib`.
```json
{
	"token": "${app-token}",
	"ownerID": "${owner-ID}"
}
```

Then kickstart the bot with,

`npm start`

### Credits

- [@dirigeants/klasa](https://github.com/dirigeants/klasa)
- [@jeanropke/RDR2CollectorsMap](https://github.com/jeanropke/RDR2CollectorsMap)
- [@muan/emoji](https://github.com/muan/emoji/)

### License

MIT
