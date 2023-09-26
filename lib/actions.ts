import { GraphQLClient } from "graphql-request";

import { createProjectMutation, createUserMutation, deleteProjectMutation, updateProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, createSurveyMutation, updateSurveyMutation, deleteSurveyMutation, getSurveyByIdQuery, getSurveyOfUserQuery, SurveyQuery } from "@/graphql";
import { ProjectForm, SurveyForm } from "@/common.types";
import { categoryFilters, departmentFilters } from "@/constant";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};


export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};


export const fetchAllProjects = (category?: string | null, endcursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);
  const categories = category == null ? departmentFilters : [category];

  return makeGraphQLRequest(projectsQuery, { categories, endcursor });
};

export const fetchAllSurvey = (category?: string | null, endcursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);
  const categorie = category == null ? departmentFilters : [category];

  return makeGraphQLRequest(SurveyQuery, { categorie, endcursor });
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
export const createNewSurvey = async (form: SurveyForm, creatorId: string, token: string) => {
  const imageUrlSurvey = await uploadImage(form.image);

  if (imageUrlSurvey.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variable = {
      input: { 
        ...form, 
        image: imageUrlSurvey.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };

    return makeGraphQLRequest(createSurveyMutation, variable);
  }
};

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const updateSurvey = async (form: SurveyForm, projectId: string, token: string) => {
  function isBase64DataURL(value: string) {
    const base64RegexSurvey = /^data:image\/[a-z]+;base64,/;
    return base64RegexSurvey.test(value);
  }

  let updatedFormSurvey = { ...form };

  const isUploadingNewImageSurvey = isBase64DataURL(form.image);

  if (isUploadingNewImageSurvey) {
    const imageUrlSurvey = await uploadImage(form.image);

    if (imageUrlSurvey.url) {
      updatedFormSurvey = { ...updatedFormSurvey, image: imageUrlSurvey.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variablesSurvey = {
    id: projectId,
    input: updatedFormSurvey,
  };

  return makeGraphQLRequest(updateSurveyMutation, variablesSurvey);
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};
export const deleteSurvey = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteSurveyMutation, { id });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getSurvyeDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getSurveyByIdQuery, { id });
};
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };
  
  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const getUserSurvey = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getSurveyOfUserQuery, { id, last });
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};
