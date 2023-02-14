` query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
      __typename
}
matchedUser(username: $username) {
      username
      contributions {
        points
        questionCount
        testcaseCount
        __typename
  }
  submissionCalendar
  submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
          __typename
    }
    totalSubmissionNum {
          difficulty
          count
          submissions
          __typename
    }
    __typename
  }
  
    __typename
  }
  
  __typename
}
}


`;
