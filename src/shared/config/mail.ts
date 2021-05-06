type MailConfigDTO = {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
};

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'oi@rentx.com.br',
      name: 'Rentx',
    },
  },
} as MailConfigDTO;
