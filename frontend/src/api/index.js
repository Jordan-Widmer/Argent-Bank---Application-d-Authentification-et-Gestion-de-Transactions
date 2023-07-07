const BASE_URL = 'http://localhost:3001/api/v1';

/**
 *  @param {String} url - BASE_URL + route
 *  @param {Object} headers
 *  @return {Object | undefined}
 * utils function to request the backend api
 */
const fetchApi = async ({url, params})=>{
  try{
    if(!url){
      return;
    }
    if(!params){
      return;
    }
    const requestedUrl = `${BASE_URL}${url}`
    const response = await fetch(requestedUrl, params);
    if(!response.ok){
      return new Error('Error occur when fetching the api');
    }
    
    return await response.json();

  } catch(error){
    console.error(error)
  }
}

/**
 * @return {Object | undefined}
 */
export const fetchUserProfile = async (token)=>{
    if(!token){
      return;
    }
    const params = { headers :{'Authorization': `Bearer ${token}`}};
    const url = `/user/profile`;
    return await fetchApi({url, params});
}

/**
 * @return {Object | undefined}
 */
export const loginUser =async (credentials) =>{
  if(!credentials){
    return
  }
  const body = JSON.stringify(credentials);
  const url = `/user/login`;
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  }
  return await fetchApi({url, params});
}

/**
 * @todo : pass a Profile Object not properties of the user profile
*
*/
/**
 * @param {String} token
 * @param {String} firstName
 * @param {String} lastName
 * @return {Object | undefined}
 */
export const updateUserProfile = async (token, firstName, lastName) =>{
  if(!token){
    return;
  }
  if(!firstName || ! lastName){
    return;
  }
    const body = JSON.stringify({ firstName, lastName })
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body,
    }
    const url =`/user/profile`;
    return fetchApi({url, params});
}
