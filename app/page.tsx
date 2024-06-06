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
              <div className="w-full h-40 flex items-center justify-center cursor-pointer">
  <div
    className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
  >
    <span
      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
    ></span>
    <span
      className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
      >Join Today</span>
  </div>
</div>

          </div>
      </div>
    </main>
    )
}
