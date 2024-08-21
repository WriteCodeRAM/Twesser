"use client";
import React, { useState } from "react";
import Link from "next/link";
import TutorialModal from "./TutorialModal";

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="flex w-full items-center justify-between p-4">
        <div className="text-pastel-blue">.</div>
        <Link href={"/"}>
          <h1 className="ml-6 py-4 font-madimi text-3xl font-bold text-dark-gray">
            Twesser
          </h1>
        </Link>

        <button
          onClick={openModal}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-soft-orange text-xl font-bold text-dark-gray transition-colors hover:text-muted-red"
        >
          ?
        </button>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-lg bg-[#222831] text-white shadow-xl">
            <div className="flex items-center justify-end border-b border-gray-600 bg-black p-4">
              <button
                onClick={closeModal}
                className="text-white hover:text-muted-red"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto bg-black p-4">
              <TutorialModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
