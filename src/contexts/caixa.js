import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import axios from '../services/axios';
import {AuthContext} from '../contexts/auth';

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
        if (res.data.id) {
          setIsCaixaOpened(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data.message === 'Theres no opened Caixa') {
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
        })
        .catch((err) => {});
    } else {
      await axios
        .post('caixa/openCaixa', null, {
          params: {
            companyId,
          },
        })
        .then((res) => {
          setIsCaixaOpened(true);
        })
        .catch((err) => {});
    }
    setLoading(false);
  };

  return (
    <CaixaContext.Provider value={{loading, openCloseCaixa, isCaixaOpened}}>
      {children}
    </CaixaContext.Provider>
  );
};
