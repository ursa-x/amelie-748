# Amelie Bellerose

[![discord.js](https://img.shields.io/badge/discord.js-v12.2.0-brightgreen)](https://www.npmjs.com/package/discord.js)

> :robot: A classy discord bot for Red Dead Online gamers, made using klasa.js.

**Amelie Bellerose** is a lively little bot to help the cowgirls and cowboys of *Red Dead Redemption 2 Online*. She rides the treacherous landscapes of the wild west, engages in witty banter, and hustles with brusque men, to tell you about

- Cart location of Madam Nazar on a daily basis
- Weekly Sets sought by Madam Nazar
- Free roam event schedule in its entirety

To talk to Amelie, type `r!help`.

### Self Host

#### Pre-requisites
- [Node](https://nodejs.org) `v.10.0.0+`
- [broccoli-cli](https://github.com/broccolijs/broccoli-cli) `v1.0.0+`
- [grunt-cli](https://github.com/gruntjs/grunt-cli) `v1.3.2+`
- [pm2](https://github.com/Unitech/pm2) `v4.4.0+`

#### Installation

To get started, clone the repo and install the packages in the repo folder
```
cd ${project-folder}
npm i
```

#### Starting the bot

Check out [An Idiot's Guide > Getting Started](https://anidiots.guide/getting-started) to get your App Token. Add it and your OwnerID to `secrets.json` file under `src/lib`.
```json
{
	"token": "${app-token}",
	"ownerID": "${owner-ID}"
}
```

Kickstart the bot with,

`npm start`

### Built using

- [@dirigeants/klasa](https://github.com/dirigeants/klasa)

### Thanks to

- [@jeanropke/RDR2CollectorsMap](https://github.com/jeanropke/RDR2CollectorsMap)
- [@richardwestenra/rdr2-free-roam-event-schedule](https://github.com/richardwestenra/rdr2-free-roam-event-schedule)
- [@muan/emoji](https://github.com/muan/emoji/)
- [Red Dead Wiki](https://reddead.fandom.com/wiki/Red_Dead_Wiki)
- [Rockstar Games](https://www.rockstargames.com/reddeadredemption2/)

### License

MIT
