export interface IWeather {
  temp?: string | number;
  description?: string | number;
  humidity?: string | number;
  windSpeed?: string | number;
}

export type WindInfo = {
  speed: number;
  deg: number;
  gust?: number;
};

export type AddressInfo = {
  id: number;
  name: string;
};
