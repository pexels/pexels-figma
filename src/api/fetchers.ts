import * as qs from 'qs';
import { KeyLoader, useSWRInfinite } from 'swr';
import { createClient, ErrorResponse } from 'pexels';
import { ImageColor, Orientation } from '../constants';

type TRawPexelsClient = ReturnType<typeof createClient>;
type TSearchFn = TRawPexelsClient['photos']['search'];
type TCuratedFn = TRawPexelsClient['photos']['curated'];

type TPexelsClient = {
  photos: {
    search: (params: Parameters<TSearchFn>[0] & {
      orientation?: Orientation;
      color?: ImageColor;
    }) => ReturnType<TSearchFn>;
    curated: TCuratedFn;
  };
}

const pexelsClient: TPexelsClient = {
  photos: {
    search: async (params) => {
      const baseUrl = 'https://api.pexels.com/v1/search';
      const apiUrl = `${baseUrl}?${qs.stringify(params)}`;
      const response = await fetch(apiUrl, {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`
        }
      });
      return await response.json();
    },
    curated: async (params) => {
      const baseUrl = 'https://api.pexels.com/v1/curated';
      const apiUrl = `${baseUrl}?${qs.stringify(params)}`;
      const response = await fetch(apiUrl, {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`
        }
      });
      return await response.json();
    }
  }
};

const isErrorResponse = <O>(input: O | ErrorResponse): input is ErrorResponse => {
  if ('error' in input) return true;
  return false;
}

const getKeyFactory = <K extends string, O extends { [k in K]?: any }>(name: string, listKey: K, transform?: (...args: any[]) => any[]): KeyLoader<O> => {
  return (pageIndex: number, previousPageData?: O | null) => {
    if (previousPageData && !previousPageData[listKey].length) return null;
    const keys = [name, pageIndex];
    return transform ? transform(...keys) : keys;
  };
}

export const usePhotosSearch = (opts: Parameters<TPexelsClient['photos']['search']>[0]) => {
  type TPhotosSearchType = ReturnType<typeof pexelsClient.photos.search> extends Promise<infer V> ? V : any;
  type FetcherDataType = Exclude<TPhotosSearchType, ErrorResponse>;

  const { query, orientation, color, size } = opts;
  const keyLoader = getKeyFactory<'photos', FetcherDataType>('photosSearch', 'photos', (...args: any[]) => ([...args, query.replace(/[^a-zA-Z_-]/g, '-'), orientation, color, size]));
  const fetcher = async (_: string, pageIndex: number): Promise<FetcherDataType> => {
    const res = await pexelsClient.photos.search({
      page: pageIndex + 1,
      query: encodeURIComponent(query),
      orientation: orientation !== Orientation.ALL ? orientation : undefined,
      color: color !== ImageColor.ALL ? color : undefined,
    });
    if (isErrorResponse(res)) throw new Error(res.error);
    return res;
  };

  return useSWRInfinite<FetcherDataType>(keyLoader, fetcher);
}

export const usePhotosCurated = () => {
  type TPhotosCuratedType = ReturnType<typeof pexelsClient.photos.curated> extends Promise<infer V> ? V : any;
  type FetcherDataType = Exclude<TPhotosCuratedType, ErrorResponse>;

  const keyLoader = getKeyFactory<'photos', FetcherDataType>('photosSearch', 'photos', (...args: any[]) => ([...args]));
  const fetcher = async (_: string, pageIndex: number): Promise<FetcherDataType> => {
    const res = await pexelsClient.photos.curated({ page: pageIndex + 1 });
    if (isErrorResponse(res)) throw new Error(res.error);
    return res;
  };

  return useSWRInfinite<FetcherDataType>(keyLoader, fetcher);
}