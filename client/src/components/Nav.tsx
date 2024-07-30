"use client";
import React, { useState } from "react";
import Link from "next/link";
import TutorialModal from "./TutorialModal";

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="flex w-full items-center justify-between p-4">
      <div className="text-pastel-blue">.</div>
      <Link href={"/"}>
        <h1 className="py-4 font-madimi text-3xl font-bold text-dark-gray">
          Twesser
        </h1>
      </Link>

      <button
        onClick={openModal}
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-soft-orange text-xl font-bold text-dark-gray transition-colors hover:text-gray-600"
      >
        ?
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <TutorialModal />
            <p
              onClick={closeModal}
              className="absolute right-4 top-2 cursor-pointer font-madimi text-2xl text-light-blue hover:text-muted-red"
            >
              x
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
