import dayjs, { Dayjs } from 'dayjs';
import idLocale from 'dayjs/locale/id';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale(idLocale);

export { dayjs, Dayjs };
