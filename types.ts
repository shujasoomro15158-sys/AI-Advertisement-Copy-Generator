
export interface AdCopy {
  professional: string;
  casual: string;
  urgent: string;
}

export interface AdInput {
  productName: string;
  targetAudience: string;
  keyFeatures: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
