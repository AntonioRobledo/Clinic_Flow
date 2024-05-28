import Link from 'next/link';
import Image from "next/image";
import styles from '@/app/ui/home.module.css';

export default function Home() {

  return (
    <main className='flex min-h-screen flex-col'>
      <div className={styles.overlay}>
        <div className='flex justify-end'>
        <button className="border-2 border-slate-300 rounded-full px-6 py-2 hover:bg-sky-600 hover:text-white text-slate-700 text-xl">Login</button>
        <button className="border-2 border-slate-300 rounded-full px-4 py-2 hover:bg-sky-600 hover:text-white text-slate-700 text-xl">Sign Up</button>
        </div>
          <div className={styles.content}>
            <h1> Welcome to Clinic Flow: A Clinic Management System for Healthcare Workers.</h1>
            <Image 
              src="/Caduceus.png"
              width={200}
              height={300}
              className='caduceus'
              alt='Caduceus symbol'
              />
          </div>
      </div>
    </main>
    )
}
