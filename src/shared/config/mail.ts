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
      email: 'cleancode@example.com.br',
      name: 'Clean Code',
    },
  },
} as MailConfigDTO;
