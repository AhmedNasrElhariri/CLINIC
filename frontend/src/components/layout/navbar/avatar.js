import React from 'react';
import { Avatar as RAvatar } from 'rsuite';
import { MdPersonOutline } from 'react-icons/md';

export default function Avatar({ avatar, user, onClick }) {
  return (
    <>
      <div
        className="sm:inline-flex items-center text-sm cursor-pointer gap-3 tw-hidden"
        onClick={onClick}
      >
        {user?.name}
        <RAvatar src={avatar} circle size="md" />
      </div>

      <MdPersonOutline className="cursor-pointer sm:hidden" onClick={onClick} />
    </>
  );
}
