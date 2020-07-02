// 'use strict';
import './sass/style.sass';

import '@babel/polyfill';
import 'es6-promise';
import 'nodelist-foreach-polyfill';
import 'fetch-polyfill';
import elementClosect from 'element-closest';
elementClosect(window);

import info from './js/info';

info();