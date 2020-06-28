import '../components/activities';
import '../components/collapsibleMenu';

export default {
  title: 'Activities aside',
  component: 'activities-aside',
};

export const ActivitiesMenu = () => {
  return document.createElement('activities-aside');
};
