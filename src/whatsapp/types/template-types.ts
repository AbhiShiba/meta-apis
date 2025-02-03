import { LanguageCode, TemplateComponents, WhatsappMessageResponse } from "./parameter-types";

export type TemplateSend = (
  to: string,
  templateName: string,
  language_code: LanguageCode,
  components?: TemplateComponents
) => Promise<WhatsappMessageResponse>;
