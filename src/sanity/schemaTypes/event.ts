import { defineField, defineType } from 'sanity';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),
    defineField({
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
    }),
    defineField({
      name: 'locationAddress',
      title: 'Location Address',
      type: 'string',
    }),
    defineField({
      name: 'locationUrl',
      title: 'Location URL',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Meetup', value: 'Meetup' },
          { title: 'Workshop', value: 'Workshop' },
          { title: 'WFC', value: 'WFC' },
          { title: 'Hackathon', value: 'Hackathon' },
          { title: 'Webinar', value: 'Webinar' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'No Registration Required', value: 'no_registration_required' },
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
          { title: 'Coming Soon', value: 'coming_soon' },
        ],
      },
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',      
      type: 'type',
    },
    prepare({ title, date, type }) {
      return {
        title: title,
        subtitle: `${date} - ${type}`,
      }
    },
  },
});
