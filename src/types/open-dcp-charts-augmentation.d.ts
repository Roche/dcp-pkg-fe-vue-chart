import type { ChartAnnotation } from '@open-dcp/charts';

declare module '@open-dcp/charts' {
    interface ChartConfig {
        annotations?: ChartAnnotation[];
    }
}
