import React, { useRef, cloneElement } from 'react';
import { Link } from 'react-router-dom';
import { Whisper, Popover, Dropdown } from 'rsuite';
import {
  MdOutlineSettings,
  MdLogout,
  MdOutlineBuild,
  MdOutlineGridView,
  MdOutlineMonetizationOn,
  MdOutlineTextSnippet,
  MdOutlineFactCheck,
} from 'react-icons/md';

export default function Settings({ t, onLogout }) {
  const settingsRef = useRef();
  const items = [
    {
      name: t('configurations'),
      icon: <MdOutlineBuild />,
      path: '/settings/configurations',
    },
    {
      name: t('staticInfo'),
      icon: <MdOutlineGridView />,
      path: '/settings/static',
    },

    {
      name: t('payroll'),
      icon: <MdOutlineMonetizationOn />,
      path: '/payroll',
    },

    {
      name: t('snippets'),
      icon: <MdOutlineTextSnippet />,
      path: '/snippets',
    },
    {
      name: t('permissions'),
      icon: <MdOutlineFactCheck />,
      path: '/permissions',
    },
  ];

  return (
    <Whisper
      trigger="click"
      placement="bottomEnd"
      ref={settingsRef}
      speaker={
        <Popover full>
          <Dropdown.Menu
            onSelect={() => settingsRef.current.close()}
            className="w-48"
          >
            {items.map((item, i) => (
              <Dropdown.Item key={i}>
                <Link to={item.path} className="flex items-center gap-1">
                  {cloneElement(item.icon, {
                    className: 'text-[1.25rem]',
                  })}
                  {item.name}
                </Link>
              </Dropdown.Item>
            ))}
            <Dropdown.Item onSelect={() => onLogout()}>
              <Link className="flex items-center gap-1" to="/login">
                <MdLogout className="text-[1.25rem]" />
                {t('logout')}
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      }
    >
      <MdOutlineSettings className="cursor-pointer" />
    </Whisper>
  );
}
