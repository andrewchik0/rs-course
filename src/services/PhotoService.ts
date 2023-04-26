import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IPhoto from '../models/IPhoto';

const headers = {
  Authorization: 'Client-ID oEs-sd2oWIy5g8sGMuh8Dp52cQTkggVZg7fIIkIyhrc',
  'Accept-Version': 'v1',
  'X-Per-Page': '10',
  'X-Total': '1',
};

export const photoAPI = createApi({
  reducerPath: 'photoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.unsplash.com', fetchFn: fetch }),
  endpoints: (build) => ({
    fetchByText: build.query<{ results: IPhoto[] }, string>({
      query: (text) => {
        return {
          url: '/search/photos',
          params: {
            page: 1,
            query: text || 'photos',
          },
          headers: headers,
          mode: 'cors',
        };
      },
    }),
    getById: build.query<IPhoto, string>({
      query: (id) => ({
        url: `/photos/${id}`,
        mode: 'cors',
        headers: headers,
      }),
    }),
  }),
});

export default photoAPI;
export const { useFetchByTextQuery, useGetByIdQuery } = photoAPI;
