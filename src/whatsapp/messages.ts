import {
  InteractionButtonComponent,
  InteractiveListComponent,
  Media,
  PhoneNumberId,
  Location,
  WhatsappMessageResponse,
} from "./types/parameter-types";
import { Carousel } from "./templates/carousel";
import { Catalog } from "./templates/catalog";
import { ApiBase } from "./shiba-api-base";
import { HeaderOptions, TokenType, Version } from "./types/common-types";
import { Template } from "./templates/template";
import { TemplateSend } from "./types/template-types";

/**
 * A class for managing WhatsApp messages using the WhatsApp Business API.
 */
export class WhatsappMessages extends ApiBase {
  public carousel: Carousel;
  public catalog: Catalog;
  public template: TemplateSend;

  /**
   * Constructs an instance of `WhatsappMessages`.
   *
   * @param {string} access_token - The access token used for authentication.
   * @param {Version} version - The API version, formatted as `v<number>`.
   * @param {PhoneNumberId} phoneNumberId - The phone number ID for sending messages.
   * @param {HeaderOptions} [headerOptions] - Optional custom headers for API requests.
   * @param {TokenType} [tokenType] - The type of token for authorization (defaults to "Bearer").
   */
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions?: HeaderOptions,
    tokenType?: TokenType
  ) {
    super(access_token, version, phoneNumberId, headerOptions, tokenType);
    this.carousel = new Carousel(access_token, version, phoneNumberId);
    this.catalog = new Catalog(access_token, version, phoneNumberId);
    this.template = new Template(
      access_token,
      version,
      phoneNumberId
    ).templateSend;
  }

  /**
   * Sends a WhatsApp message with the given data.
   *
   * @private
   * @param {object} data - The message payload.
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  private async sendMessage(data: object): Promise<WhatsappMessageResponse> {
    return this.send(data);
  }

  /**
   * Sends a plain text message.
   *
   * @param {string} to - The recipient's phone number in international format.
   * @param {string} bodyText - The text content of the message.
   * @param {boolean} [preview_url=true] - Whether to enable URL previews in the message.
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  async text(
    to: string,
    bodyText: string,
    preview_url: boolean = true
  ): Promise<WhatsappMessageResponse> {
    return this.sendMessage({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: { preview_url, body: bodyText },
    });
  }

  /**
   * Sends an image or video message.
   *
   * @private
   * @param {string} to - The recipient's phone number.
   * @param {Media} mediaOption - The media object containing details (e.g., URL or ID).
   * @param {"image" | "video"} type - The type of media message.
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  private async mediaMessage(
    to: string,
    mediaOption: Media,
    type: "image" | "video"
  ): Promise<WhatsappMessageResponse> {
    const { type: _, ...mediaData } = mediaOption; // Remove `type` if present
    return this.sendMessage({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type,
      [type]: mediaData,
    });
  }

  /**
   * Sends an image message.
   *
   * @param {string} to - The recipient's phone number.
   * @param {Media} imageOption - The media object containing image details.
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  async image(
    to: string,
    imageOption: Media
  ): Promise<WhatsappMessageResponse> {
    return this.mediaMessage(to, imageOption, "image");
  }

  /**
   * Sends a video message.
   *
   * @param {string} to - The recipient's phone number.
   * @param {Media} videoOption - The media object containing video details.
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  async video(
    to: string,
    videoOption: Media
  ): Promise<WhatsappMessageResponse> {
    return this.mediaMessage(to, videoOption, "video");
  }

  /**
   * Sends an interactive button message.
   *
   * @param {string} to - The recipient's phone number.
   * @param {InteractionButtonComponent} component - The interactive button details.
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  async interactiveReplyButtons(
    to: string,
    component: InteractionButtonComponent
  ): Promise<WhatsappMessageResponse> {
    return this.sendMessage({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: component.body,
        action: { buttons: component.buttons },
        ...(component.header && { header: component.header }),
        ...(component.footer && { footer: component.footer }),
      },
    });
  }

  /**
   * Sends an interactive list reply message.
   *
   * @param {string} to - The recipient's phone number.
   * @param {InteractiveListComponent} component - The interactive list component details.
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  async interactiveListReply(
    to: string,
    component: InteractiveListComponent
  ): Promise<WhatsappMessageResponse> {
    return this.sendMessage({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "list",
        body: component.body,
        action: {
          button: component.button,
          sections: component.section,
        },
        ...(component.header && { header: component.header }),
        ...(component.footer && { footer: component.footer }),
      },
    });
  }

  /**
   * Sends a location message.
   *
   * @param {string} to - The recipient's phone number.
   * @param {Location} location - The location details (latitude, longitude, and address).
   * @returns {Promise<WhatsappMessageResponse>} The API response.
   */
  async location(
    to: string,
    location: Location
  ): Promise<WhatsappMessageResponse> {
    return this.sendMessage({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "location",
      location,
    });
  }
}
