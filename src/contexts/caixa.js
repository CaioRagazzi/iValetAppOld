import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from '../services/axios';
import {AuthContext} from '../contexts/auth';
import {showInformation} from '../components/toast';

export const CaixaContext = createContext();

export const CaixaProvider = ({children}) => {
  const {companyId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isCaixaOpened, setIsCaixaOpened] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`caixa/openedCaixa/${companyId}`)
      .then((res) => {
        console.log('response', res.data);
        if (res.data.id) {
          setIsCaixaOpened(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('error', err.response.data);
        if (err.response.data.message === 'Theres no opened Caixa!') {
          setIsCaixaOpened(false);
          setLoading(false);
        }
      });
  }, [companyId]);

  const openCloseCaixa = async () => {
    setLoading(true);
    if (isCaixaOpened) {
      await axios
        .post('caixa/closeCaixa', null, {
          params: {
            companyId,
          },
        })
        .then((res) => {
          setIsCaixaOpened(false);
          showInformation('Caixa fechado com sucesso!');
        })
        .catch((err) => {});
    } else {
      console.log('quicou');
      await axios
        .post('caixa/openCaixa', null, {
          params: {
            companyId,
          },
        })
        .then((res) => {
          setIsCaixaOpened(true);
          showInformation('Caixa aberto com sucesso!');
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
    setLoading(false);
  };

  return (
    <CaixaContext.Provider
      value={{loading, openCloseCaixa, isCaixaOpened, setLoading}}>
      {children}
    </CaixaContext.Provider>
  );
};
