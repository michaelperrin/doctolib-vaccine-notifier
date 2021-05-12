import dotenv from 'dotenv';
import getCenterWithAvailability from './src/getCenterWithAvailability.js';
import sendNotification from './src/notifier.js';

dotenv.config();

const centerWithAvailability = await getCenterWithAvailability();

if (centerWithAvailability !== null) {
  sendNotification(`Vaccin dispo à : ${centerWithAvailability.name}`);
}
