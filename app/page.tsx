import Link from 'next/link';
import Image from "next/image";
import styles from '@/app/ui/home.module.css';

export default function Home() {

  return (
    <div className={styles.overlay}>
      <button className="border-2 border-slate-300 rounded-full px-6 py-2 hover:bg-sky-600 hover:text-white text-slate-700 text-xl">Login</button>
      <button className="border-2 border-slate-300 rounded-full px-4 py-2 hover:bg-sky-600 hover:text-white text-slate-700 text-xl">Sign Up</button>
        <div className={styles.content}>
          <h1> Welcome to Clinic Flow: A Clinic Management System for Healthcare Workers.</h1>
          <img src="https://www.freeiconspng.com/uploads/medical-caduceus-png-16.png" width="30%" alt="Caduceus" />
        </div>
    </div>

    )
}

