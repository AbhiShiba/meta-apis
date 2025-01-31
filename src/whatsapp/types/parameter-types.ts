export type LanguageCode =
  | "en"
  | "en_us"
  | "en_GB"
  | "es"
  | "es_MX"
  | "es_AR"
  | "fr"
  | "fr_FR"
  | "de"
  | "pt_BR"
  | "pt_PT"
  | "hi"
  | "ar"
  | "zh_CN"
  | "zh_TW";

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

export type Currency = {
  type: "currency";
  fallback_value: string;
  /** Currency code as defined in ISO 4217. */
  code: string;
  /** Amount multiplied by 1000. */
  amount_1000: number;
};

export type Date_Time = {
  type: "date_time";
  fallback_value: string;
};

type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type Link = {
  type: "link";
  link: string;
};

type Id = {
  type: "id";
  id: number;
};

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

export type QuickReply = {
  index: "0" | "1" | "2";
  parameters: {
    type: "payload";
    payload: string;
  }[];
};

type MessageResponse = {
  messaging_product: string;
  contacts: {
    input: string;
    wa_id: string;
  }[];
  messages: {
    id: string;
    message_status?: string;
  }[];
};

export type ResponseSuccess = {
  status: "success";
} & MessageResponse;

export type ResponseError = {
  status: "error";
  error: {
    message: string;
    details?: Record<string, any>;
  }[];
};

export type WhatsappMessageResponse = ResponseSuccess | ResponseError;

export type Body = {
  text: string;
};

export type Footer = {
  text: string;
};

export type Reply = {
  type: "reply";
  reply: {
    id: string;
    title: string;
  };
};

export type Buttons<T> = [T] | [T, T] | [T, T, T];

export type InteractiveButton = Buttons<Reply>;

export type InteractionButtonComponent = {
  // type: "button";
  body: Body;
  footer?: Footer;
  header?: Message_Header;
  // action: {
  //   buttons: Buttons<Reply>;
  // };
  buttons: InteractiveButton;
};

type Row = {
  id: string;
  title: string;
  description?: string;
};

export type Section = {
  title: string;
  rows: Row[];
};

export type InteractiveListComponent = {
  // type: "list";
  body: Body;
  header?: TextParameter;
  footer?: Footer;
  // action: {
  //   button: string;
  //   sections: Section[];
  // };
  button: string;
  section: Section[];
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

export type TemplateComponents = {
  bodyParameter?: TextParameter[];
  headerParameter?: Message_Header;
  quickReply?: Buttons<QuickReply>;
};

export type ProductHeader = {
  product_retailer_id: string;
  catalog_id: string;
};

export type CarouselQuickReply = {
  sub_type: "quick_reply";
  index: 0 | 1;
  payload: string;
};

export type CarouselUrlButton = {
  sub_type: "url";
  index: 0 | 1;
  text: string;
};

type CarouselButtons<T> = [T] | [T, T];

export type CarouselCardItems = {
  header: ImageParameter | VideoParameter;
  bodyParameters?: string[];
  buttons: CarouselButtons<CarouselQuickReply | CarouselUrlButton>;
};

type Cards<T> =
  | BuildTuple<T, 1>
  | BuildTuple<T, 2>
  | BuildTuple<T, 3>
  | BuildTuple<T, 4>
  | BuildTuple<T, 5>
  | BuildTuple<T, 6>
  | BuildTuple<T, 7>
  | BuildTuple<T, 8>
  | BuildTuple<T, 9>
  | BuildTuple<T, 10>;

export type CarouselTemplateComponents = {
  bodyParameters?: string[];
  cards: Cards<CarouselCardItems>;
};

type CarouselBodyParameters = TextParameter | Currency | Date_Time;

export type ProductCarousel = {
  bodyParameters?: CarouselBodyParameters[];
  cards: Cards<ProductHeader>;
};

export function isResponseSuccess(
  data: MessageResponse
): data is MessageResponse {
  const result =
    typeof data === "object" &&
    "messaging_product" in data &&
    typeof data.messaging_product === "string" &&
    "messages" in data &&
    Array.isArray(data.messages) &&
    data.messages.every((obj) => "id" in obj && typeof obj.id === "string") &&
    "contacts" in data &&
    Array.isArray(data.contacts) &&
    data.contacts.every(
      (obj) =>
        "input" in obj &&
        typeof obj.input === "string" &&
        "wa_id" in obj &&
        typeof obj.wa_id === "string"
    );

  return result;
}

export function isMediaWithId(media: Media): media is MediaId {
  return "id" in media;
}

export function isMediaWithLink(media: Media): media is MediaURL {
  return "link" in media;
}
