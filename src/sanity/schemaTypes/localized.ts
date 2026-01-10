import { defineType } from 'sanity';

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'id',
      title: 'Bahasa Indonesia',
      type: 'string',
    },
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
  ],
});

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'id',
      title: 'Bahasa Indonesia',
      type: 'text',
      rows: 3,
    },
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
    },
  ],
});
