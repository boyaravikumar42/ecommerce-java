// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Notfound() {
  return (
    <motion.main
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 !px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <svg
        className="mt-12 h-40 w-40 select-none fill-fuchsia-300"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
      </svg>
      <h1 className="text-8xl h-[8rem] font-extrabold text-fu drop-shadow-lg">404</h1>
      <p className="!mt-4 text-2xl text-bold text-gray-950">Oops! The page you’re looking for doesn’t exist.</p>
      <p className="!mt-4 text-2xl text-gray-700 !px-[4rem] md:!px-[9rem] text-center">It might have been removed, renamed, or it never existed in the first place. Please check the URL or return to the homepage.</p>

      <Link
        to="/"
        className="!mt-8 rounded-2xl bg-blue-600 !px-6 !py-2 text-lg font-medium text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Back to Home
      </Link>

   
      
    </motion.main>
  );
}
