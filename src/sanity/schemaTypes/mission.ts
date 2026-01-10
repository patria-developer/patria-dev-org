import { defineField, defineType } from 'sanity';

export const missionType = defineType({
  name: 'mission',
  title: 'Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      description: 'Title in ID and EN',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'localizedText',
      description: 'Description in ID and EN',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'color',
      title: 'Color Class',
      type: 'string',
      description: 'Tailwind classes for text/bg color (e.g., bg-yellow-100 text-yellow-600)',
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient Class',
      type: 'string',
      description: 'Tailwind classes for gradient (e.g., from-yellow-400 to-orange-500)',
    }),
  ],
});
