import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  addAllRefuseTypes,
  addBoroughDistrict,
  addNeighborhoodInfo,
  add12Months,
  convertWeightsToNumbers,
  removeMonthWhitespace,
} from '../utils/dataProcessing';
import { DataItemType, CityResponseDataType, RefuseTypes } from '../types/types';
import popNeighbData from '../data/popNeighbData';

export const useCityData = (year: number) => {
  const [data, setData] = useState<DataItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const url = `https://data.cityofnewyork.us/resource/8bkb-pvci.json?$where=month like '%25${year}%25'`;

    try {
      const res = await axios.get<CityResponseDataType[]>(url);

      const step1 = removeMonthWhitespace(res.data);
      const step2 = convertWeightsToNumbers(step1);
      const step3 = addBoroughDistrict(step2);
      const step4 = addNeighborhoodInfo(step3, popNeighbData);
      const step5 = add12Months(step4);
      const step6 = addAllRefuseTypes(step5);

      setData(step6);
    } catch (err) {
      console.error('Failed to fetch:', err);
      setError('Could not load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
