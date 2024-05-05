import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createRoleEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async () => {
    const response = await api.GET('/v1/roles');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  add: async (
    projectId: string,
    roleId: string,
    options:
      | {
          teamId: string;
        }
      | {
          userId: string;
        }
  ) => {
    if ('userId' in options) {
      const response = await api.PUT(
        '/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}',
        {
          params: {
            path: {
              roleId,
              projectId,
              userId: options.userId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    }

    const response = await api.PUT(
      '/v1/roles/projects/{projectId}/teams/{teamId}/roles/{roleId}',
      {
        params: {
          path: {
            roleId,
            projectId,
            teamId: options.teamId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  delete: async (
    projectId: string,
    roleId: string,
    options:
      | {
          teamId: string;
        }
      | {
          userId: string;
        }
  ) => {
    if ('userId' in options) {
      const response = await api.DELETE(
        '/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}',
        {
          params: {
            path: {
              roleId,
              projectId,
              userId: options.userId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    }

    const response = await api.DELETE(
      '/v1/roles/projects/{projectId}/teams/{teamId}/roles/{roleId}',
      {
        params: {
          path: {
            roleId,
            projectId,
            teamId: options.teamId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});