import type { RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import BookDetails from '@/pages/BookDetails';
import Reader from '@/pages/Reader';
import Audio from '@/pages/Audio';
import Library from '@/pages/Library';
import Profile from '@/pages/Profile';
import Premium from '@/pages/Premium';
import NotFound from '@/pages/NotFound';

export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/catalog', element: <Catalog /> },
  { path: '/book/:id', element: <BookDetails /> },
  { path: '/reader/:id', element: <Reader /> },
  { path: '/audio/:id', element: <Audio /> },
  { path: '/library', element: <Library /> },
  { path: '/profile', element: <Profile /> },
  { path: '/premium', element: <Premium /> },
  { path: '*', element: <NotFound /> }
];
