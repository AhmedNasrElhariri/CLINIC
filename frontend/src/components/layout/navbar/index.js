import React, { useEffect } from 'react';
import {
  Form,
  Navbar as RNavbar,
  SelectPicker,
  FormControl,
  FormGroup,
} from 'rsuite';
import { set, get } from 'services/local-storage';
import Navigator from './navigator';
import { useNewAppointment } from 'hooks';
import { i18n } from '../../../translations/i18n';
import * as R from 'ramda';
import { MdMenu } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Notifications from 'components/functional/notifications';
import Settings from 'components/functional/settings';
import Avatar from './avatar';

export default function Navbar({
  onLogout,
  onClickAvatar,
  avatar,
  notifications,
  onClear,
  formValue,
  setFormValue,
  user,
}) {
  const { t } = useTranslation();
  const { organizationBranches } = useNewAppointment({});
  const language = R.propOr('en', 'language')(user);
  useEffect(() => {
    setFormValue(prev => ({
      ...prev,
      branchId: get('branch'),
    }));
  }, [setFormValue]);
  useEffect(() => {
    i18n.changeLanguage(language);
    if (language === 'ar') {
      setFormValue(prev => ({ ...prev, dir: 'rtl' }));
      set('dir', 'rtl');
    } else {
      setFormValue(prev => ({ ...prev, dir: 'ltr' }));
      set('dir', 'ltr');
    }
  }, [language, setFormValue]);

  return (
    <>
      <RNavbar
        className="px-3 sm:px-5 md:px-10 min-h-[52px] flex items-center"
        id="Navbar"
      >
        <MdMenu
          className="text-2xl cursor-pointer lg:hidden mr-4 sm:mr-10"
          onClick={() =>
            setFormValue(prev => ({ ...prev, isDrawerOpen: true }))
          }
        />
        <Navigator />
        <Form
          formValue={formValue}
          onChange={setFormValue}
          className="grow inline-flex justify-center items-center"
        >
          <FormGroup>
            <FormControl
              name="branchId"
              
              accepter={SelectPicker}
              className="w-32 sm:w-48 md:w-56"
              menuClassName="!mt-1"
              data={organizationBranches}
              onSelect={val => set('branch', val)}
              labelKey="name"
              valueKey="id"
            />
          </FormGroup>
        </Form>

        <div
          className="inline-flex items-center  ml-auto
        gap-3 md:gap-4 lg:gap-7
        text-2xl sm:text-3xl"
        >
          <Avatar avatar={avatar} user={user} onClick={onClickAvatar} />
          <Settings t={t} onLogout={onLogout} />
          <Notifications onClear={onClear} notifications={notifications} />
        </div>
      </RNavbar>
    </>
  );
}
