// `
// query skillStats($username: String!) {
//     matchedUser(username: $username) {
//       tagProblemCounts {
//         advanced {
//           tagName
//           tagSlug
//           problemsSolved
//         }
//         intermediate {
//           tagName
//           tagSlug
//           problemsSolved
//         }
//         fundamental {
//           tagName
//           tagSlug
//           problemsSolved
//         }
//       }
//     }
//   }
// `;

` query userProblemsSolved($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
      
`;
