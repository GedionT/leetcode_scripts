const usernameRecentActivity = async (username) => {
  const endpoint = "https://leetcode.com/graphql";
  const headers = {
    "content-type": "application/json",
    Authorization: "<token>",
  };

  const variables = {
    username: username,
    limit: 1,
  };

  const graphqlQuery = {
    operationName: "recentAcSubmissions",
    query: ` query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          timestamp
        }
      }
          `,
    variables: variables,
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();
  if (!data.errors && data.data.recentAcSubmissionList.length != 0) {
    const timestamp = data.data.recentAcSubmissionList[0].timestamp; // data
    const today = new Date().setHours(0, 0, 0, 0);
    const thatDay = new Date(parseInt(timestamp + "000")).setHours(0, 0, 0, 0);
    if (today === thatDay) {
      return { username: username, recentActivity: true };
    } else {
      return { username: username, recentActivity: false };
    }
  } else {
    return { username: username, recentActivity: false };
  }
};

export default usernameRecentActivity;
