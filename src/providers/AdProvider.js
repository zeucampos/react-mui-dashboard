import React, { createContext, useState } from "react";

let AdContext = createContext({});

export function AdProvider({ children }) {
  let [list, setList] = useState([]);
  let [current, setCurrent] = useState({});

  let value = { list, setList, current, setCurrent };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
}

export function useAds() {
  return React.useContext(AdContext);
}
