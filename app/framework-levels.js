localStorage.setItem(
  "framework-levels",
  JSON.stringify({
    categories: [
      {
        name: "Technology",
        levels: [
          {
            name: "Adopts",
            level: 1,
            description:
              "actively learns and adopts the technology and tools defined by the team",
          },
          {
            name: "Specializes",
            level: 2,
            description:
              "is the go-to person for one or more technologies and takes initiative to learn new ones",
          },
          {
            name: "Evangelizes",
            level: 3,
            description:
              "researches, creates proofs of concept and introduces new technologies to the team",
          },
          {
            name: "Masters",
            level: 4,
            description:
              "has very deep knowledge about the whole technology stack of the system",
          },
          {
            name: "Creates",
            level: 5,
            description:
              "designs and creates new technologies that are widely used either by internal or external teams",
          },
        ],
      },
      {
        name: "System",
        levels: [
          {
            name: "Enhances",
            level: 1,
            description:
              "successfully pushes new features and bug fixes to improve and extend the system",
          },
          {
            name: "Designs",
            level: 2,
            description:
              "designs and implements medium to large size features while reducing the system’s tech debt",
          },
          {
            name: "Owns",
            level: 3,
            description:
              "owns the production operation and monitoring of the system and is aware of its SLAs",
          },
          {
            name: "Evolves",
            level: 4,
            description:
              "evolves the architecture to support future requirements and defines its SLAs",
          },
          {
            name: "Leads",
            level: 5,
            description:
              "leads the technical excellence of the system and creates plans to mitigate outages",
          },
        ],
      },
      {
        name: "People",
        levels: [
          {
            name: "Learns",
            level: 1,
            description:
              "quickly learns from others and consistently steps up when it is required",
          },
          {
            name: "Supports",
            level: 2,
            description:
              "proactively supports other team members and helps them to be successful",
          },
          {
            name: "Mentors",
            level: 3,
            description:
              "mentors others to accelerate their career-growth and encourages them to participate",
          },
          {
            name: "Coordinates",
            level: 4,
            description:
              "coordinates team members providing effective feedback and moderating discussions",
          },
          {
            name: "Manages",
            level: 5,
            description:
              "manages the team members’ career, expectations, performance and level of happiness",
          },
        ],
      },
      {
        name: "Process",
        levels: [
          {
            name: "Follows",
            level: 1,
            description:
              "follows the team processes, delivering a consistent flow of features to production",
          },
          {
            name: "Enforces",
            level: 2,
            description:
              "enforces the team processes, making sure everybody understands the benefits and tradeoffs",
          },
          {
            name: "Challenges",
            level: 3,
            description:
              "challenges lthe team processes, looking for ways to improve them",
          },
          {
            name: "Adjusts",
            level: 4,
            description:
              "adjusts the team processes, listening to feedback and guiding the team through the changes",
          },
          {
            name: "Defines",
            level: 5,
            description:
              "defines the right processes for the team’s maturity level, balancing agility and discipline",
          },
        ],
      },
      {
        name: "Influence",
        levels: [
          {
            name: "Subsystem",
            level: 1,
            description: "makes an impact on one or more subsystems",
          },
          {
            name: "Team",
            level: 2,
            description:
              "makes an impact on the whole team, not just on specific parts of it",
          },
          {
            name: "Multiple Teams",
            level: 3,
            description:
              "makes an impact not only his/her team but also on other teams",
          },
          {
            name: "Company",
            level: 4,
            description: "makes an impact on the whole tech organization",
          },
          {
            name: "Community",
            level: 5,
            description: "makes an impact on the tech community",
          },
        ],
      },
    ],
    maxRank: 6,
    levels: [
      {
        label: "D1",
        rank: [1, 1, 1, 1, 1],
      },
      {
        label: "D2",
        rank: [1, 2, 2, 2, 1],
      },
      {
        label: "D3",
        rank: [2, 2, 2, 3, 2],
      },
      {
        label: "D4",
        rank: [3, 3, 3, 3, 2],
      },
      {
        label: "D5",
        rank: [4, 4, 3, 4, 3],
      },
      {
        label: "D6",
        rank: [5, 5, 3, 4, 4],
      },
      {
        label: "D7",
        rank: [5, 5, 3, 4, 5],
      },
      {
        label: "TL4",
        rank: [2, 3, 4, 4, 1],
      },
      {
        label: "TL5",
        rank: [3, 4, 4, 5, 2],
      },
      {
        label: "TL6",
        rank: [4, 5, 4, 5, 3],
      },
      {
        label: "TL7",
        rank: [4, 5, 4, 5, 4],
      },
      {
        label: "TPM4",
        rank: [2, 2, 4, 4, 3],
      },
      {
        label: "TPM5",
        rank: [2, 2, 4, 5, 3],
      },
      {
        label: "TPM6",
        rank: [2, 3, 5, 5, 4],
      },
      {
        label: "TPM7",
        rank: [2, 4, 5, 5, 5],
      },
      {
        label: "EM5",
        rank: [3, 3, 5, 4, 2],
      },
      {
        label: "EM6",
        rank: [3, 4, 5, 5, 2],
      },
      {
        label: "EM7",
        rank: [3, 4, 5, 5, 3],
      },
    ],
  })
);
