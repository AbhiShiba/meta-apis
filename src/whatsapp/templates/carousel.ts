import {
  CarouselTemplateComponents,
  LanguageCode,
  PhoneNumberId,
  ProductCarousel,
} from "../types/parameter-types";
import { ApiBase } from "../shiba-api-base";
import { HeaderOptions, TokenType, Version } from "../types/common-types";

export class Carousel extends ApiBase {
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions?: HeaderOptions,
    tokenType?: TokenType
  ) {
    super(access_token, version, phoneNumberId, headerOptions, tokenType);
  }

  async media(
    to: string,
    templateName: string,
    language_code: LanguageCode,
    components: CarouselTemplateComponents
  ) {
    const _components = this.templateComponents(components);

    const data = this.templateStructur(
      to,
      templateName,
      language_code,
      _components
    );

    const response = await this.send(data);

    return response;
  }

  async product(
    to: string,
    templateName: string,
    language_code: LanguageCode,
    components: ProductCarousel
  ) {
    const _components = this.productComponents(components);

    const data = this.templateStructur(
      to,
      templateName,
      language_code,
      _components
    );

    const response = await this.send(data);

    return response;
  }

  private productComponents(components: ProductCarousel) {
    const product = [];
    if (components.bodyParameters?.length) {
      product.push({
        type: "body",
        parameters: components.bodyParameters,
      });
    }

    const cards = components.cards.map((ele, index) => {
      const item = {
        card_index: index,
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "product",
                product: {
                  product_retailer_id: ele.product_retailer_id,
                  catalog_id: ele.catalog_id,
                },
              },
            ],
          },
        ],
      };
      return item;
    });

    product.push({
      type: "carousel",
      cards,
    });

    return product;
  }

  private templateComponents(components: CarouselTemplateComponents) {
    const _components = [];

    if (components.bodyParameters?.length) {
      _components.push({
        type: "body",
        parameters: components.bodyParameters,
      });
    }

    const _cards = components.cards.map((ele, index) => {
      const cardComponents = [];

      if (ele.header.type === "image") {
        const image = {
          type: "header",
          parameters: [
            {
              type: "image",
              ...(ele.header.image.type === "id"
                ? {
                    image: {
                      link: ele.header.image.id,
                    },
                  }
                : {
                    image: {
                      link: ele.header.image.link,
                    },
                  }),
            },
          ],
        };
        cardComponents.push(image);
      }

      if (ele.header.type === "video") {
        const image = {
          type: "header",
          parameters: [
            {
              type: "video",
              ...(ele.header.video.type === "id"
                ? {
                    video: {
                      link: ele.header.video.id,
                    },
                  }
                : {
                    video: {
                      link: ele.header.video.link,
                    },
                  }),
            },
          ],
        };
        cardComponents.push(image);
      }

      if (ele.bodyParameters?.length) {
        cardComponents.push({
          type: "body",
          parameters: ele.bodyParameters,
        });
      }

      for (const { sub_type, index, ...rest } of ele.buttons) {
        if (sub_type === "quick_reply") {
          const quickReply = {
            type: "button",
            sub_type: "quick_reply",
            index,
            parameters: [
              {
                type: "payload",
                payload: "payload" in rest ? rest.payload : "",
              },
            ],
          };
          cardComponents.push(quickReply);
        }
        if (sub_type === "url") {
          const urlButton = {
            type: "button",
            sub_type: "url",
            index,
            parameters: [
              {
                type: "text",
                text: "text" in rest ? rest.text : "",
              },
            ],
          };
          cardComponents.push(urlButton);
        }
      }

      const item = {
        card_index: index,
        components: cardComponents,
      };

      return item;
    });

    _components.push({
      type: "carousel",
      cards: _cards,
    });

    return _components;
  }
}
