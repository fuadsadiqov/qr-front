export const VOTE_URL = {
    GET: 'votes',
    POST: 'votes',
    PUT: (id: string) => `votes/${id}`,
    DELETE: (id: string) => `votes/${id}`
}

export const TEAM_URL = {
    GET: 'teams',
    POST: 'teams',
    PUT: (id: string) => `teams/${id}`,
    DELETE: (id: string) => `teams/${id}`
}

export const VOTER_URL = {
    GET: 'voters',
    POST: 'voters',
    PUT: (id: string) => `voters/${id}`,
    DELETE: (id: string) => `voters/${id}`
}

export const IMAGE_URL = {
    POST: 'upload'
}