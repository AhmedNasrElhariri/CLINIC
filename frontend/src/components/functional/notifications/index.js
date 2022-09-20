import React from 'react';
import { Whisper, Popover, Button, List, Badge } from 'rsuite';
import { MdOutlineNotifications } from 'react-icons/md';

export default function Notifications({ onClear, notifications }) {
  return (
    <Whisper
      trigger="click"
      placement="bottomEnd"
      speaker={
        <Popover full>
          <div className="w-64 min-h-[10rem] p-3">
            <h6 className="flex justify-between items-center mb-3">
              <strong>Notifications</strong>
              <Button size="sm" onClick={() => onClear()}>
                Clear
              </Button>
            </h6>
            <List hover size="sm">
              {notifications.map((item, i) => (
                <List.Item key={i}>
                  <p>{item.message}</p>
                </List.Item>
              ))}
            </List>
          </div>
        </Popover>
      }
    >
      {notifications.length > 0 ? (
        <Badge>
          <MdOutlineNotifications className="cursor-pointer" />
        </Badge>
      ) : (
        <MdOutlineNotifications className="cursor-pointer" />
      )}
    </Whisper>
  );
}
