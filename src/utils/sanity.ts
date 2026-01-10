import { sanityClient } from 'sanity:client'

export interface SanityEvent {
  title: string
  slug: { current: string }
  date: string // ISO date string YYYY-MM-DD
  time: string
  locationName: string
  locationAddress: string
  locationUrl?: string
  type: 'Meetup' | 'Workshop' | 'WFC' | 'Hackathon' | 'Webinar'
  status: 'no_registration_required' | 'open' | 'closed' | 'coming_soon'
  registrationLink?: string
  description: string
  image?: SanityImage
}

interface SanityImage {
  asset: {
    url: string
  }
}

export interface SanityLocalizedString {
  id: string
  en: string
}

export interface SanityPageTitle {
  id: string
  name: SanityLocalizedString
  title: SanityLocalizedString
}

export interface SanityHero {
  title1: string
  title2: string
  description: string
  buttonTextJoin: string
  image?: SanityImage
  floatCardTitle: string
  floatCardDescription: string
}

export interface SanityGallery {
  title: string
  images: Array<SanityImage>
}

export interface SanityMission {
  title: string
  desc: string
  icon?: SanityImage
  color: string
  gradient: string
}

export interface SanityTeamMember {
  name: string
  role: string
  image?: SanityImage
  bio: string
  order: number
}

export interface SanitySiteSettings {
  name: string
  title: string
  description: string
  email: string
  address: string
  profile: {
    memberCount: string
    eventsPerYear: string
    localSpeakers: string
    cost: string
  }
  navLinks: Array<{
    label: string
    href: string
  }>
  socialLinks: Array<{
    platform: string
    href: string
    icon?: SanityImage
  }>
}

export async function getEvents(
  lang: 'id' | 'en' = 'id'
): Promise<SanityEvent[]> {
  const query = `*[_type == "event"] | order(date desc) {
    title,
    slug,
    date,
    time,
    locationName,
    locationAddress,
    type,
    status,
    registrationLink,
    locationUrl,
    "description": description.${lang},
    image {
      asset->{
        url
      }
    },
  }`

  try {
    return await sanityClient.fetch(query)
  } catch (error) {
    console.warn('Error fetching events from Sanity:', error)
    return []
  }
}

export async function getHero(lang: 'id' | 'en' = 'id'): Promise<SanityHero> {
  const query = `*[_type == "hero"][0] {
    "title1": title1.${lang},
    "title2": title2.${lang},
    "description": description.${lang},
    "buttonTextJoin": buttonTextJoin.${lang},
    image {
      asset->{
        url
      }
    },
    "floatCardTitle": floatCardTitle.${lang},
    "floatCardDescription": floatCardDescription.${lang},
  }`

  try {
    return await sanityClient.fetch(query)
  } catch (error) {
    console.warn('Error fetching hero from Sanity:', error)
    return {
      title1: '',
      title2: '',
      description: '',
      buttonTextJoin: '',
      floatCardTitle: '',
      floatCardDescription: '',
    }
  }
}

export interface EventFilterOptions {
  search?: string
  type?: string | string[]
  locationName?: string
  startDate?: string
  endDate?: string
}

export async function getLocations(): Promise<string[]> {
  const query = `array::unique(*[_type == "event"].locationName)`
  return await sanityClient.fetch(query)
}

export async function getUpcomingEvents(
  lang: 'id' | 'en' = 'id',
  options: EventFilterOptions = {}
): Promise<SanityEvent[]> {
  const { search, type, locationName, startDate, endDate } = options
  const today = new Date().toISOString().split('T')[0]

  let filter = `_type == "event" && date >= "${today}"`

  if (search) {
    filter += ` && (title match "*${search}*" || description.${lang} match "*${search}*")`
  }

  if (type) {
    if (Array.isArray(type) && type.length > 0) {
      const typeFilter = type.map((t) => `type == "${t}"`).join(' || ')
      filter += ` && (${typeFilter})`
    } else if (typeof type === 'string' && type !== 'all') {
      filter += ` && type == "${type}"`
    }
  }

  if (startDate) {
    filter += ` && date >= "${startDate}"`
  }

  if (endDate) {
    filter += ` && date <= "${endDate}"`
  }

  if (locationName) {
    filter += ` && locationName == "${locationName}"`
  }

  const query = `*[${filter}] | order(date asc) {
    title,
    slug,
    date,
    time,
    locationName,
    locationAddress,
    type,
    status,
    registrationLink,
    locationUrl,
    "description": description.${lang},
    image {
      asset->{
        url
      }
    }
  }`

  try {
    // console.log('Fetching upcoming events with filter:', filter);
    return await sanityClient.fetch(query)
  } catch (error) {
    console.warn('Error fetching upcoming events from Sanity:', error)
    return []
  }
}

export async function getPastEvents(
  lang: 'id' | 'en' = 'id',
  options: EventFilterOptions = {}
): Promise<SanityEvent[]> {
  const { search, type, startDate, endDate } = options
  const today = new Date().toISOString().split('T')[0]

  let filter = `_type == "event" && date < "${today}"`

  if (search) {
    filter += ` && (title match "*${search}*" || description.${lang} match "*${search}*")`
  }

  if (type) {
    if (Array.isArray(type) && type.length > 0) {
      const typeFilter = type.map((t) => `type == "${t}"`).join(' || ')
      filter += ` && (${typeFilter})`
    } else if (typeof type === 'string' && type !== 'all') {
      filter += ` && type == "${type}"`
    }
  }

  if (startDate) {
    filter += ` && date >= "${startDate}"`
  }

  if (endDate) {
    filter += ` && date <= "${endDate}"`
  }

  const query = `*[${filter}] | order(date desc) {
    title,
    slug,
    date,
    time,
    locationName,
    locationAddress,
    type,
    status,
    registrationLink,
    locationUrl,
    "description": description.${lang},
    image {
      asset->{
        url
      },
    }
  }`

  try {
    // console.log('Fetching past events with filter:', filter);
    return await sanityClient.fetch(query)
  } catch (error) {
    console.warn('Error fetching past events from Sanity:', error)
    return []
  }
}

export async function getGallery(): Promise<SanityGallery | null> {
  const query = `*[_type == "gallery"][0] {
    title,
    images[] {
      asset->{
        url
      },
    }
  }`
  return await sanityClient.fetch(query)
}

export async function getMissions(
  lang: 'id' | 'en' = 'id'
): Promise<SanityMission[]> {
  const query = `*[_type == "mission"] {
    "title": title.${lang},
    "desc": desc.${lang},
    icon {
      asset->{
        url
      }
    },
    color,
    gradient
  }`
  return await sanityClient.fetch(query)
}

export async function getTeamMembers(
  lang: 'id' | 'en' = 'id'
): Promise<SanityTeamMember[]> {
  const query = `*[_type == "team"] | order(order asc) {
    name,
    "role": role.${lang},
    image {
      asset->{
        url
      },
    },
    "bio": bio.${lang},
    order
  }`
  return await sanityClient.fetch(query)
}

export async function getSiteSettings(
  lang: 'id' | 'en' = 'id'
): Promise<SanitySiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    name,
    "title": title.${lang},
    "description": description.${lang},
    email,
    address,
    profile,
    navLinks,
    socialLinks[] {
      platform,
      href,
      icon {
        asset->{
          url
        }
      }
    }
  }`
  return await sanityClient.fetch(query)
}

export async function getPageTitle(
  id: string,
  lang: 'id' | 'en' = 'id'
): Promise<SanityPageTitle | null> {
  const query = `*[_type == "pageTitle" && id == "${id}"][0] {
    id,
    "name" : name.${lang},
    "title" : title.${lang}
  }`
  return await sanityClient.fetch(query)
}
