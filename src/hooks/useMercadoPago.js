import { useState, useEffect } from "react";

const useMercadoPago = () => {
  const [MPReady, setMPReady] = useState(false)

  useEffect(() => {
    if (document.readyState !== "loading") {setMPReady(true)}
    document.addEventListener("DOMContentLoaded",
    () => {setMPReady(true)})
  }, [])

  return MPReady
};

export default useMercadoPago;
