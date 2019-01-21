import {SpectatorWithHost, createHostComponentFactory} from '@netbasal/spectator';
import {CardComponent} from './card.component';
import {MatCardModule} from '@angular/material';

describe('Card', function() {
  let host: SpectatorWithHost<CardComponent>;

  const createHost = createHostComponentFactory({
    component: CardComponent,
    imports: [MatCardModule]
  });

  it('should display the default title and content of the card', () => {
    // When
    host = createHost(`<card></card>`);
    // Then
    expect(host.query('.title')).toHaveText('Default Title');
    expect(host.query('.content')).toHaveText('Default Content');
  });

  it('should display the default title and content of the card - Negative Test', () => {
    // When
    host = createHost(`<card></card>`);
    // Then
    // Negative Test to make sure we don't have false positives
    expect(host.query('.title')).not.toHaveText('No Title');
    expect(host.query('.content')).not.toHaveText('No Content');
  });

});