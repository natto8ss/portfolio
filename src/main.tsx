import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../common/css/html5reset.css';
import '../common/css/base.css';
import '../common/css/parts.css';
import '../css/top.css';
import './playground.css';

const root = document.getElementById('root');
if (!root) throw new Error('React root element was not found.');

createRoot(root).render(<StrictMode><App /></StrictMode>);
