import { lazy } from 'react';
// import React from 'react'

export const Chips = lazy(() => import('./Chips'));
export const Numbers = lazy(() => import('./Numbers'));
export const Table = lazy(()=>import('./Table'))
export const Line = lazy(()=>import('./Line'))
export const Id = lazy(()=>import('./Id'))
export const Description = lazy(()=>import('./Description'))
export const NumberHoc = lazy(() => import('./NumberHoc'));