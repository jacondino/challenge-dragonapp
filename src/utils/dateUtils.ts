import moment from 'moment';

moment.locale('pt-BR');

export const DateUtils = {
  formatDate: (date: string | Date, format = 'DD/MM/YYYY') => {
    if (!date) return '';

    return moment(date).format(format);
  },
};
