import { List } from 'antd';
import { Link } from 'react-router-dom';

const ListItem = ({ closeDrawer, route, t }) => {
  return (
    <List.Item className="text-xs py-0 px-4 h-10 flex items-center justify-between">
      <Link
        onClick={closeDrawer}
        to={route.path}
        className="flex items-center text-xs gap-2 h-full grow text-slate-600"
      >
        <route.icon className="!text-[18px]" /> {t(route.name)}
      </Link>
      {route.extra}
    </List.Item>
  );
};
export default ListItem;
