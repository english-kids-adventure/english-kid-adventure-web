import axiosClient from '@lib/axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HTTP_METHOD, type HttpMethod } from '@shared/constants/httpMethod';
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@shared/types/api';
import { handleApiError } from '@shared/services/apiError';

const extractData = <T>(
  response: AxiosResponse<ApiResponse<T>>,
): T => response.data.data;

const extractFullResponse = <T>(
  response: AxiosResponse<ApiResponse<T>>,
): ApiResponse<T> => response.data;

interface BaseRequestOptions<D> {
  url: string
  method: HttpMethod
  data?: D
  config?: AxiosRequestConfig
}

const requestData = async <T, D = unknown>({
  url,
  method,
  data,
  config,
}: BaseRequestOptions<D>): Promise<T> => {
  try {
    const response = await axiosClient.request<ApiResponse<T>>({
      url,
      method,
      data,
      ...config,
    });

    return extractData(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

const requestFull = async <T, D = unknown>({
  url,
  method,
  data,
  config,
}: BaseRequestOptions<D>): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosClient.request<ApiResponse<T>>({
      url,
      method,
      data,
      ...config,
    });

    return extractFullResponse(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T>({
      url,
      method: HTTP_METHOD.GET,
      config,
    });

export const getWithPagination = <T>(
  url: string,
  params?: PaginationParams,
  config?: AxiosRequestConfig,
): Promise<PaginatedResponse<T>> =>
    requestData<PaginatedResponse<T>>({
      url,
      method: HTTP_METHOD.GET,
      config: {
        ...config,
        params: {
          ...params,
          ...config?.params,
        },
      },
    });

export const post = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T, D>({
      url,
      method: HTTP_METHOD.POST,
      data,
      config,
    });

export const postFull = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> =>
    requestFull<T, D>({
      url,
      method: HTTP_METHOD.POST,
      data,
      config,
    });

export const put = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T, D>({
      url,
      method: HTTP_METHOD.PUT,
      data,
      config,
    });

export const patch = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T, D>({
      url,
      method: HTTP_METHOD.PATCH,
      data,
      config,
    });

export const del = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> =>
    requestData<T>({
      url,
      method: HTTP_METHOD.DELETE,
      config,
    });

export const delFull = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> =>
    requestFull<T>({
      url,
      method: HTTP_METHOD.DELETE,
      config,
    });
