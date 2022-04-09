import { Component, BaseComponent } from '@jovotech/framework';

@Component()
export class AheadComponent extends BaseComponent {
  START() {
    this.$send({
      message: this.$t('Ahead'),
      listen: false,
    });
  }
}
