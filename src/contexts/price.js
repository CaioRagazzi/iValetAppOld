import React, {createContext, useState, useContext} from 'react';
import axios from '../services/axios';
import {format} from 'date-fns';
import {AuthContext} from '../contexts/auth';
import {showWarning} from '../components/toast';

export const PriceContext = createContext();

export const PriceProvider = ({children}) => {
  const {companyId} = useContext(AuthContext);
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);
  const [fixedValue, setfixedValue] = useState('');
  const [isFixedEnabled, setIsFixedEnabled] = useState(true);
  const [isDynamicEnabled, setIsDynamicEnabled] = useState(false);
  const [quantityDynamic, setQuantityDynamic] = useState([]);
  const [hasMaxValue, setHasMaxValue] = useState(false);
  const [maxValue, setMaxValue] = useState('');

  const getPriceByUniqueId = async (uniqueId) => {
    let priceReturn = [];
    await axios.get(`price/uniqueid/${uniqueId}`).then((res) => {
      priceReturn = res.data;
    });

    return priceReturn;
  };

  const populateFields = async (priceParam) => {
    const priceReturn = await getPriceByUniqueId(priceParam.uniqueIdPrice);
    if (priceReturn[0].type === 1) {
      setWeekDaysButtons(priceReturn[0].weekDay);
      setfixedValue(priceReturn[0].price);
      setIsDynamicEnabled(false);
      setIsFixedEnabled(true);
    }

    if (priceReturn[0].type === 2) {
      setWeekDaysButtons(priceReturn[0].weekDay);
      setQuantityDynamic([]);
      setIsDynamicEnabled(true);
      setIsFixedEnabled(false);
      populateDynamicFields(priceReturn);
      if (priceReturn[0].maxPriceValue) {
        setHasMaxValue(true);
        setMaxValue(priceReturn[0].maxPriceValue);
      }
    }
  };

  const populateDynamicFields = (priceParam) => {
    priceParam.map((priceItem) => {
      setQuantityDynamic((previousState) => [
        ...previousState,
        {
          id: format(new Date(), 'HHmmssSSS'),
          start: priceItem.to.toString(),
          end: priceItem.from.toString(),
          price: priceItem.price.toString(),
        },
      ]);
    });
  };

  const setWeekDaysButtons = (weekdayParam) => {
    const splited = weekdayParam.split('|');

    splited.map((item) => {
      switch (item) {
        case 'M':
          setSegunda(true);
          break;
        case 'TU':
          setTerca(true);
          break;
        case 'W':
          setQuarta(true);
          break;
        case 'TH':
          setQuinta(true);
          break;
        case 'F':
          setSexta(true);
          break;
        case 'SA':
          setSabado(true);
          break;
        case 'SU':
          setDomingo(true);
          break;
      }
    });
  };

  const createFixedPrice = async (weekDays) => {
    let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
    let created = false;
    await axios
      .post('price', {
        type: 1,
        weekDay: weekDays,
        companyId,
        price: +fixedValue,
        uniqueIdPrice: uniqueIdPrice,
      })
      .then(() => {
        created = true;
      })
      .catch((err) => {
        if (err.response.data.message === 'Same day has already been added!') {
          showWarning('Já existe uma configuração para esse mesmo dia!');
        }
        created = false;
      });

    return created;
  };

  const createDynamicPrice = async (weekDays) => {
    let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
    let created = false;
    await Promise.all(
      quantityDynamic.map(async (item) => {
        await axios
          .post('price', {
            type: 2,
            to: +item.start,
            from: +item.end,
            weekDay: weekDays,
            companyId,
            price: +item.price,
            uniqueIdPrice: uniqueIdPrice,
            maxPriceValue: hasMaxValue ? +maxValue : undefined,
          })
          .then(() => {
            created = true;
          })
          .catch((err) => {
            if (
              err.response.data.message === 'Same day has already been added!'
            ) {
              showWarning('Já existe uma configuração para esse mesmo dia!');
            }
            created = false;
          });
      }),
    );

    return created;
  };

  const cleanFields = () => {
    setSegunda(false);
    setTerca(false);
    setQuarta(false);
    setQuinta(false);
    setSexta(false);
    setSabado(false);
    setDomingo(false);
    setIsFixedEnabled(true);
    setIsDynamicEnabled(false);
    setQuantityDynamic([]);
    setfixedValue('');
    setHasMaxValue(false);
    setMaxValue('');
  };

  return (
    <PriceContext.Provider
      value={{
        segunda,
        setSegunda,
        terca,
        setTerca,
        quarta,
        setQuarta,
        quinta,
        setQuinta,
        sexta,
        setSexta,
        sabado,
        setSabado,
        domingo,
        setDomingo,
        populateFields,
        fixedValue,
        setfixedValue,
        cleanFields,
        isFixedEnabled,
        setIsFixedEnabled,
        isDynamicEnabled,
        setIsDynamicEnabled,
        quantityDynamic,
        setQuantityDynamic,
        createFixedPrice,
        createDynamicPrice,
        hasMaxValue,
        setHasMaxValue,
        maxValue,
        setMaxValue,
      }}>
      {children}
    </PriceContext.Provider>
  );
};
