type TemplateVariablesDTO = {
  [key: string]: string | number | boolean;
};

type ParseTemplateDTO = {
  file: string;
  variables: TemplateVariablesDTO;
};

export { ParseTemplateDTO };
