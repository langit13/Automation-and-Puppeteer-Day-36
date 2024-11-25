const dc = require('./dc');

const BASE_URL = 'discord.com';
(async () => {
    await dc.initialize();
    await dc.login();
    await dc.moveTo('1310585288015351829','1310585288619196508');
    await dc.textMsg('/fish');
})();