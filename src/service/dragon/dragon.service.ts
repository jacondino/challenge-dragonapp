import axios from 'axios';
import { DragonProp } from '../../types';

const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io';

export const DragonsService = {
  listDragons: async () => {
    const { data } = await axios.get(`${API_URL}/api/v1/dragon`);

    return data;
  },
  detailDragon: async (id: number) => {
    const { data } = await axios.get(`${API_URL}/api/v1/dragon/${id}`);

    return data;
  },
  createDragon: async (dragon: DragonProp) =>
    await axios.post(`${API_URL}/api/v1/dragon`, dragon),

  deleteDragon: async (id: string) =>
    await axios.delete(`${API_URL}/api/v1/dragon/${id}`),
};
