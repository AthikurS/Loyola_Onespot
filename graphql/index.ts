export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const createSurveyMutation = `
	mutation CreateSurvey($input: SurveyCreateInput!) {
		surveyCreate(input: $input) {
			survey {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateSurveyMutation = `
	mutation UpdateSurvey($id: ID!, $input: SurveyUpdateInput!) {
		surveyUpdate(by: { id: $id }, input: $input) {
			survey {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
   
export const deleteSurveyMutation = `
  mutation DeleteSurvey($id: ID!) {
    SurveyDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
   

export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarUrl
				description
				githubUrl
				linkedinUrl
				id
			}
		}
	}
`;

export const projectsQuery = `
  query getProjects($categories: [String!], $endcursor: String) {
    projectSearch(first: 20, after: $endcursor, filter: {category: {in: $categories}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          futureEnhancement
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
export const SurveyQuery = `
  query getSurvey($categories: [String!], $endcursor: String) {
    projectSearch(first: 20, after: $endcursor, filter: {category: {in: $categories}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          futureEnhancement
          description
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      futureEnhancement
      image
      liveSiteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;
export const getSurveyByIdQuery = `
  query GetSurveyById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      futureEnhancement
      image
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedinUrl
    }
  }
`;
      
export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
            
          }
        }
      }
    }
  }
`;

export const getSurveyOfUserQuery = `
  query getUserSurvey($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      Survey(last: $last) {
        edges {
          node {
            id
            title
            image
            
          }
        }
      }
    }
  }
`;
