import { Inter, Lusitana, EB_Garamond } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });

export const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400'],
});
 
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});