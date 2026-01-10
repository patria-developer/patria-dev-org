import { defineField } from 'sanity'
import type { SanityLocalizedString } from '../../utils/sanity'

export const heroType = {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title1',
      title: 'Title1',
      type: 'localizedString',
      description: 'Title 1 in ID and EN',
    }),
    defineField({
      name: 'title2',
      title: 'Title2',
      type: 'localizedString',
      description: 'Title 2 in ID and EN',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Description in ID and EN',
    }),
    defineField({
      name: 'buttonTextJoin',
      title: 'Button Text Join',
      type: 'localizedString',
      description: 'Button Text in ID and EN',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'floatCardTitle',
      title: 'Float Card Title',
      type: 'localizedString',
      description: 'Float Card Title in ID and EN',
    }),
    defineField({
      name: 'floatCardDescription',
      title: 'Float Card Description',
      type: 'localizedString',
      description: 'Float Card Description in ID and EN',
    }),
  ],
  preview: {
    select: {
      title1: 'title1',
      title2: 'title2',
      description: 'description',
    },
    prepare({
      title1,
      title2,
      description,
    }: {
      title1: SanityLocalizedString
      title2: SanityLocalizedString
      description: SanityLocalizedString
    }) {
      return {
        title: title1.en + ' - ' + title2.en,
        subtitle: description.en,
      }
    },
  },
}
