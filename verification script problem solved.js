import fs from "fs";

(async () => {
  const problemSolved = async (username) => {
    const endpoint = "https://leetcode.com/graphql";
    const headers = {
      "content-type": "application/json",
      Authorization: "<token>",
    };

    const varibles = {
      username: username,
    };

    const graphqlQuery = {
      // query for user problem solved count
      operationName: "userProblemsSolved",
      query: ` query userProblemsSolved($username: String!) {
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
      }`,
      variables: varibles,
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();
    console.info(data);

    if (!data.errors) {
      const count =
        data.data.matchedUser.submitStatsGlobal.acSubmissionNum[0].count;
      return count;
    } else {
      return -1;
    }
  };

  const listOfUsernames = [
    "samuel2222",
    "kalish93",
    "Adaaking",
    "albetre",
    "ets083412",
    "mx1_mr41",
    "bahailu",
    "Ephrem_alemayehu",
    "haylat",
    "fuadMiftah",
    "surafellion",
    "DagmawiBabi",
    "nkav2447",
    "NaodArarsa",
    "johnabi",
    "ishaksebsib",
    "dagem_tad",
    "Biniyam1080",
    "Ararsa",
    "zerourewina9",
    "Solomonl",
    "dannytheman",
    "miedan",
    "Betiiy_haile",
    "Abeselom_Dejene",
    "Kids1343",
    "milkias17",
    "Motolomy",
    "LtTAD",
    "Rediettt",
    "tise_genene",
    "kasaneshAyalew",
    "AbuHaithem",
    "Mosess",
    "Duredure",
    "Kaleb-Besufikad",
    "debi_b",
    "Ousman125",
    "Libe12",
    "salahadinjuharleo",
    "mukeremali112",
    "Selamudev",
    "bisratberhanu",
    "kidistdinku21",
    "Tinsae_Birhan",
    "amanueldemirew",
    "mac526",
    "HaymanotDemis",
    "khalid11abdu",
    "ezrablackfish",
    "tinsu1_",
    "abdullah_75f",
    "Dubela",
    "Yaekob",
    "abrambelay1",
    "abdulmelikambaw619",
    "belayneh_12",
    "nachu12",
    "jemsa12",
    "Kenna-Tefera",
    "nokosha-mani",
    "imimranmoh2",
    "dani-el",
    "Robel_Tamirat",
    "sossyh",
    "Zerihun5",
    "ayenew_tarekegn",
    "naolaa",
    "Keba777",
    "neba1998",
    "Nawey99",
    "abelashine",
    "chala_olani",
    "mohaali482",
    "addisada",
    "Edilcc",
    "fikremaryam1992",
    "yakisolo",
    "mahisami",
    "melak12",
    "Natabd005",
    "Tsedey_Mekonnen",
    "Mesekir19",
    "temesgenz",
    "elleet_Coder",
    "baslaelW",
    "abrhamgg",
    "Enyew",
    "MeronEdea",
    "Abinetzerihun",
    "AmanuelAbel",
    "mera--",
    "Dooyo",
    "Abdim",
    "dag_weg",
    "jedidiahandualem",
    "edenzewdu434",
    "leulabay1",
    "Mediunique",
    "Surafel_",
    "Debisa",
    "Silvanus20",
    "abrham_tafere",
    "Haweten_Girma",
    "bese21",
    "misganmoges03",
    "Nuredinbedru",
    "Nebil_Yisehak",
    "alayuestifanos",
    "namus79",
    "dawitzeleke",
    "yared_bt",
    "shuaibahmedin",
    "meresenior14232314",
    "dereje76",
    "yohannesdestagebru10",
    "Natnael_32",
    "sami1889",
    "wendecoder",
    "leetabel245",
    "Simret",
    "yohhannees",
    "adanemoges6",
    "oumburs9",
    "blueboylearns",
    "nefelibatala1993",
    "YaniMep",
    "DaveYenew",
    "FedasaBote",
    "Hirya",
    "meleleetytb",
    "yose27",
    "Jerusalemgirma",
    "Abrham_W",
    "Adalem",
    "kemeriyamohammed",
    "haileok",
    "natinaelfekadu",
    "Mentesnotsibatu",
    "Datsede04",
    "Natan_M",
    "IyasuH",
    "tezena",
    "Usmael",
    "kidus_32",
    "eyuab",
    "mania7",
    "Dave_Min_Dieva",
    "michael_shimeles",
    "sol2304",
    "mengeashe",
    "MarufAbrar",
    "Fraol11",
    "Hanna_Tesfaye",
    "etsubeta",
    "godadsamuel",
    "abrahamgenetu",
    "hailedereje",
    "ejoeltesfaye",
    "abigailfh19",
    "consci210",
    "nathnaelteshome10",
    "wossen",
    "Myk0__2716",
    "Hawi-Abdi",
    "Fekreselassie",
    "ebissa",
    "Helawit",
    "bill7maye",
    "Yoseph_Gebeyehu",
    "birukCoder",
    "ab3lT",
    "petros_Beyene",
    "EstifanosNega",
    "Kaleab_Tibebu",
    "binvod",
    "eyosiastamirat20",
    "Mikiyas21",
    "msol",
    "Dani192021",
    "naodmulu",
    "kumatelila",
    "abaysew_21",
    "kidus87",
    "ekimwill",
    "libanabduba",
    "redii",
    "Mohammed-Mehad",
    "ab3lT",
    "habibgm",
    "moshem3884",
    "Birook_",
    "eden_123",
    "dagmaros27",
    "user6082j",
    "BethT",
    "fayo",
    "KnightDanny",
    "Bahiru-Yimolal",
    "Abdulmuin",
    "dawit_01",
    "latii",
    "akuna444",
    "TewodrosAbebe",
    "Johnians",
    "Nahom-101",
    "r_235",
    "zelalem61",
    "eyuu1",
    "oliyadkedir3",
    "Akinahom",
    "sasasolomon",
    "hksmith",
    "Bekicoder",
    "bemnet16",
    "MelatMesele",
    "kibr22",
    "starstuff",
    "tade_kaldas",
    "eden_123",
    "bashagre",
    "BirhanuAsmamaw",
    "mststy8",
    "yonasawraris123",
    "fasika",
    "joohnA",
    "yonasketema",
    "Dagmawi_Tensay",
    "veronicaglh",
    "Haaland",
    "Ephishime",
    "kalkidan_7",
    "Nanati",
    "Selahadin",
    "donniedereje1",
    "beleme",
  ];

  const result = [];
  for (let username of listOfUsernames) {
    console.log("username:", username, typeof username);
    let count = await problemSolved(username);
    result.push(count);
  }

  console.table(result);
  // save all the result to a file called verified.txt
  fs.writeFileSync("v_solved.txt", JSON.stringify(result));
})();
