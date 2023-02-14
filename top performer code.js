(async () => {
  const usernameRecentActivity = async (username) => {
    const endpoint = "https://leetcode.com/graphql";
    const headers = {
      "content-type": "application/json",
      Authorization: "<token>",
    };

    const varibles = {
      username: username,
      limit: 50,
    };
    const graphqlQuery = {
      operationName: "recentAcSubmissions",
      query: ` query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        timestamp
      }
    }
        `,
      variables: varibles,
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();
    if (!data.errors && data.data.recentAcSubmissionList.length != 0) {
      // const timestamp = data.data.recentAcSubmissionList[0].timestamp; // data

      // console.log(data.data.recentAcSubmissionList);

      // count the number of accepted solutions in the last 7 days
      const count = data.data.recentAcSubmissionList.filter(
        (submission) =>
          submission.timestamp >
          Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60
      ).length;

      return count;
    } else {
      return 0;
    }
  };

  const listOfUsernames = [
    "abencell",
    "https://leetcode.com/Abianamo",
    "abrahamshimekt",
    "ante-neh",
    "betselot49",
    "birehan",
    "Dawit-Melka",
    "GedT",
    "Henokaa",
    "Rediet-Dejene",
  ];

  let result = {};
  for (username of listOfUsernames) {
    // check if username is a url
    if (username.includes("leetcode.com")) {
      username = username.split("/");
      if (username[username.length - 1] == "") {
        username = username[username.length - 2];
      } else {
        username = username[username.length - 1];
      }
    }

    result[username] = await usernameRecentActivity(username);
    console.log(result[username]);
  }

  console.log(result);

  // sort the result object by value
  // const sortedResult = Object.fromEntries(
  //   Object.entries(result).sort(([, a], [, b]) => b - a)
  // );

  // print top 10
  // console.log(sortedResult);
})();

// // our top performer calculation

// function myFunction() {
//   const listOfUsernames = SpreadsheetApp.getActive()
//     .getRange("Info Sheet!J2:J1800")
//     .getValues();
//   // Logger.log(temp) // check if url's are getting extracted

//   var result = {};
//   for (let username of listOfUsernames) {
//     // check if username is a url
//     if (username.includes("leetcode.com")) {
//       username = username.split("/").pop();
//     }

//     var response = UrlFetchApp.fetch(
//       encodeURI(
//         `https://leetcode.com/graphql?query={recentAcSubmissionList(username:"${username}", limit: 50){timestamp}}`
//       )
//     );
//     var data = JSON.parse(response.getContentText());

//     if (!data.errors && data.data.recentAcSubmissionList.length != 0) {
//       const count = data.data.recentAcSubmissionList.filter(
//         (submission) =>
//           submission.timestamp >
//           Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60
//       ).length;

//       result[username] = count;
//       Logger.log(username + "->" + data.data.recentAcSubmissionList);
//     }
//   }

//   const sortedResult = Object.fromEntries(
//     Object.entries(result).sort(([, a], [, b]) => b - a)
//   );

//   Logger.log(sortedResult);
// }

// myFunction();
