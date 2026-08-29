import { ForecastService } from './ForecastService';
import { ApiForecastService } from './ApiForecastService';

// Production API-connected Forecast Service instance
export const forecastService: ForecastService = new ApiForecastService();

export * from './types';
export * from './ForecastService';
export * from './ApiForecastService';

