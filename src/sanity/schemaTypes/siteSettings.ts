import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Patria Dev',
    }),
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'profile',
      title: 'Profile Stats',
      type: 'object',
      fields: [
        defineField({ name: 'memberCount', type: 'string', title: 'Member Count' }),
        defineField({ name: 'eventsPerYear', type: 'string', title: 'Events Per Year' }),
        defineField({ name: 'localSpeakers', type: 'string', title: 'Local Speakers' }),
        defineField({ name: 'cost', type: 'string', title: 'Cost' }),
      ],
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label (Translation Key)' }),
            defineField({ name: 'href', type: 'string', title: 'URL' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', type: 'string', title: 'Platform' }),
            defineField({ name: 'href', type: 'string', title: 'URL' }),
            defineField({ name: 'icon', type: 'image', title: 'Icon', options: { hotspot: true } }),
          ],
        },
      ],
    }),
  ],
});
