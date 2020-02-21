import React, {useState} from 'react';

export const GlobalContext = React.createContext();

export default ({children}) => {

  // VEIL
  const [veil, setVeil] = useState(false);
  const veilHandler = (v = true) => setVeil(v);
  
  // ALERTER
  const [alerter, setAlerter] = useState({ active: false });
  const alerterHandler = (al = { active: false }) => setAlerter(al);

  const value = {
    alerter: { setAlerter: alerterHandler, value: alerter },
    veil: { setVeil: veilHandler, value: veil }
  }

  return (
    <GlobalContext.Provider value={value}> {children} </GlobalContext.Provider>
  )
};
