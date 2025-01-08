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
  category {
  ... on Categories {
    title
  }
}
  date
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

interface Category {
  title: string;
}

interface Project {
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
  category: Category;
  date: string;
}

interface FetchResponse {
  data?: {
    projectsCollection?: {
      items: Project[];
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
  console.log(
    "projects",
    projects.data?.projectsCollection?.items?.[0].imagesCollection
  );
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
