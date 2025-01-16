const PROJECTS_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  thumbnail {
    url
  }
  imagesCollection {
    items {
      url
    }
  }
  projectUrl
  description {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  category
  date
`;

const ABOUT_PAGE_GRAPHQL_FIELDS = `
  presentationText
  educationsCollection {
    items {
    ... on Education {
    titel
      slug
      institution
      startDate
      endDate
      description
    }
    }
  }
  workExperiencesCollection {
    items {
    ... on WorkExperience {
    title
      slug
      company
      startDate
      endDate
      description
    }
    }
  }
`;

const CONTACT_GRAPHQL_FIELDS = `
sys {
    id
  }
  title
  slug
  description
  image {
    url
  }
  eMail
  linkedin
  github
`;
interface Sys {
  id: string;
}

interface AssetBlock {
  sys: Sys;
  url: string;
  description: string;
}

interface DescriptionLinks {
  assets: {
    block: AssetBlock[];
  };
}

interface Description {
  json: string; // Adjust the type if you have a specific structure for the JSON
  links: DescriptionLinks;
}

export interface Project {
  sys: Sys;
  title: string;
  slug: string;
  summary: string;
  thumbnail: {
    url: string;
  };
  imagesCollection: {
    items: { url: string }[];
  };
  projectUrl: string;
  description: Description;
  category: string;
  date: string;
}

interface Education {
  titel: string;
  slug: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface WorkExperience {
  title: string;
  slug: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface AboutPage {
  sys: Sys;
  presentationText: string;
  educationsCollection: {
    items: Education[];
  };
  workExperiencesCollection: {
    items: WorkExperience[];
  };
}

export interface Contact {
  sys: Sys;
  title: string;
  slug: string;
  description: string;
  image: {
    url: string;
  };
  eMail: string;
  linkedin: string;
  github: string;
}

interface FetchResponse {
  data?: {
    projectsCollection?: {
      items: Project[];
    };
    aboutPageCollection?: {
      items: AboutPage[];
    };
    contactCollection?: {
      items: Contact[];
    };
  };
}

async function fetchGraphQL(
  query: string,
  preview: boolean = false
): Promise<FetchResponse> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["projects"] },
    }
  );
  return response.json();
}

function extractProjectsEntries(
  fetchResponse: FetchResponse
): Project[] | undefined {
  return fetchResponse?.data?.projectsCollection?.items;
}

export async function getAllProjects(
  limit: number = 3,
  isDraftMode: boolean = false
): Promise<Project[] | undefined> {
  const query = `query {
    projectsCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
    isDraftMode ? "true" : "false"
  }) {
      items {
        ${PROJECTS_GRAPHQL_FIELDS}
      }
    }
  }`;

  const projects = await fetchGraphQL(query, isDraftMode);
  return extractProjectsEntries(projects);
}

export async function getProject(
  slug: string,
  isDraftMode: boolean = false
): Promise<Project | undefined> {
  const query = `query {
    projectsCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
    isDraftMode ? "true" : "false"
  }) {
      items {
        ${PROJECTS_GRAPHQL_FIELDS}
      }
    }
  }`;

  const project = await fetchGraphQL(query, isDraftMode);
  const projects = extractProjectsEntries(project);
  return projects ? projects[0] : undefined;
}

function extractAboutPageEntries(
  fetchResponse: FetchResponse
): AboutPage[] | undefined {
  return fetchResponse?.data?.aboutPageCollection?.items.map((item) => ({
    ...item,
    educations: item.educationsCollection?.items || [],
    workExperiences: item.workExperiencesCollection?.items || [],
  }));
}

export async function getAboutPage(
  isDraftMode: boolean = false
): Promise<AboutPage | undefined> {
  const query = `query {
    aboutPageCollection(limit: 1, preview: ${isDraftMode ? "true" : "false"}) {
      items {
        ${ABOUT_PAGE_GRAPHQL_FIELDS}
      }
    }
  }`;

  const response = await fetchGraphQL(query, isDraftMode);
  const aboutPage = extractAboutPageEntries(response);
  return aboutPage ? aboutPage[0] : undefined;
}

function extractContactEntries(
  fetchResponse: FetchResponse
): Contact[] | undefined {
  return fetchResponse?.data?.contactCollection?.items;
}

export async function getContact(
  limit = 3,
  isDraftMode: boolean = false
): Promise<Contact | undefined> {
  const query = `query {
    contactCollection(limit: ${limit}, preview: ${
    isDraftMode ? "true" : "false"
  }) {
    items {
      ${CONTACT_GRAPHQL_FIELDS}
    }}
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  const contact = extractContactEntries(response);
  return contact ? contact[0] : undefined;
}
