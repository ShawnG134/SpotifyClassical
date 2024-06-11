"use client";
import React, { useEffect, useState } from "react";

// import AuthModal from "../../components/AuthModal"
// import UploadModal from "../../components/UploadModal"
// import SubscribeModal from "@/components/SubscribeModal"

// import { ProductWithPrice } from "@/types"
import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
interface ModalProviderProps {
  // products: ProductWithPrice[]
}

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal></Modal>
      <AuthModal />
      {/*<UploadModal />*/}
      {/*<SubscribeModal products={products} />*/}
    </>
  );
}
