import { JpDateTimeFormat } from '@/dis/JpDateTimeFormat';
import { DiContainer } from '@/utils/DiContainer';

export const diContainer = new DiContainer<{
  jpDateTimeFormat: JpDateTimeFormat;
}>({
  jpDateTimeFormat: new JpDateTimeFormat(),
});
