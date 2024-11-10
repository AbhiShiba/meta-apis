export type LanguageCode = "en_us";

export type PhoneNumberId = string | number;

interface MediaId {
  type: "id";
  id: number | string;
  caption?: string;
}

interface MediaURL {
  type: "url";
  link: string;
  caption?: string;
}

export type Media = MediaURL | MediaId;

export type TextParameter = {
  type: "text";
  text: string;
};

type Link = string;
type Id = number;

type ImageParameter = {
  type: "image";
  image: Id | Link;
};

type VideoParameter = {
  type: "video";
  video: Id | Link;
};

type DocumentParameter = {
  type: "document";
  document: Id | Link;
};

export type Message_Header =
  | TextParameter
  | ImageParameter
  | VideoParameter
  | DocumentParameter;

export type TemplateComponents = {
  bodyParamenter?: TextParameter[];
  headerParameter?: Message_Header;
};

export type Response = {
  messaging_product: string;
  contacts: [
    {
      input: string;
      wa_id: string;
    }
  ];
  messages: [
    {
      id: string;
    }
  ];
};

export type Body = {
  text: string;
};

export type Footer = {
  text: string;
};

type Reply = {
  type: "reply";
  reply: {
    id: string;
    title: string;
  };
};

type Buttons<T> = [T] | [T, T] | [T, T, T];

export type InteractionButtonComponent = {
  type: "button";
  body: Body;
  footer?: Footer;
  header?: Message_Header;
  action: {
    buttons: Buttons<Reply>;
  };
};

type Row = {
  id: string;
  title: string;
  description?: string;
};

type Section = {
  title: string;
  rows: Row[];
};

export type InteractiveListComponent = {
  type: "list";
  body: Body;
  header?: TextParameter;
  footer?: Footer;
  action: {
    button: string;
    sections: Section[];
  };
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = Coordinates & { name?: string; address?: string };

export type UploadMIMEType =
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "video/mp4"
  | "application/pdf";

export function isMediaWithId(media: Media): media is MediaId {
  return "id" in media;
}

export function isMediaWithLink(media: Media): media is MediaURL {
  return "link" in media;
}
