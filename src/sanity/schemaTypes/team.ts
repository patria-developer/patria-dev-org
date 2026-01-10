import { defineField, defineType } from 'sanity';

export const teamType = defineType({
  name: 'team',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localizedString',
      description: 'Role in ID and EN',
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
      name: 'bio',
      title: 'Bio',
      type: 'localizedText',
      description: 'Biography in ID and EN',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      image: 'image',
    },
    prepare({ name, role, image }) {
      return {
        title: name.en,
        subtitle: role.en,
        media: image,
      }
    },
  },
});
