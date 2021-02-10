import React,{useState} from 'react';

import { ContainerStyled, BodyStyled } from './style';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import Link from './link';
import { Div, Img } from 'components';



export default function Sidebar({ onLogout ,items}) {
  const { pathname } = useLocation();
  return (
    <ContainerStyled>
      <Div position="absolute" left={35} top={40}>
        <RouterLink to="/">
          <Img src="/logo.svg" alt="" width={150} />
        </RouterLink>
      </Div>
      <BodyStyled>
        {items.map(({ to, name ,extra}, idx) => (
          <Link key={idx} to={to} active={pathname === to}>
            <div>{name}{extra}</div>
          </Link>
        ))}
      </BodyStyled>
    </ContainerStyled>
  );
}
