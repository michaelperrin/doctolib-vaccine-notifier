import dotenv from 'dotenv';
import getCenterInfo from './src/getCenterInfo.js';
import sendNotification from './src/notifier.js';

dotenv.config();

const ids = process.argv.slice(2);

for (const id of ids) {
  const centerInfo = await getCenterInfo(id);

  console.log(centerInfo);

  if (centerInfo.hasAvailability) {
    console.log(centerInfo.name);
    sendNotification(`Vaccin dispo à : ${centerInfo.name}`);
    break;
  }
}
