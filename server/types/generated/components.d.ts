import type { Schema, Struct } from '@strapi/strapi';

export interface BioBiography extends Struct.ComponentSchema {
  collectionName: 'components_bio_biographies';
  info: {
    displayName: 'Biography';
  };
  attributes: {
    date: Schema.Attribute.String;
    description: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'bio.biography': BioBiography;
    }
  }
}
