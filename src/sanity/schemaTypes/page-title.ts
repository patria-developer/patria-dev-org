import { defineField } from 'sanity'

export const pageTitleType = {
  name: 'pageTitle',
  title: 'Page Title',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
  ],
}
