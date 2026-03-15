/**
 * Default (read-only) framework from engineeringladders.com.
 *
 * Roles include a `category` field so the UI can group them.
 * Category is derived from the label prefix:
 *   D   → Developer
 *   TL  → Tech Lead
 *   TPM → Technical Project Manager
 *   EM  → Engineering Manager
 */
const DEFAULT_FRAMEWORK = {
  name: "Engineering Ladders",
  categories: [
    {
      name: "Technology",
      levels: [
        { level: 1, name: "Adopts",      description: "actively learns and adopts the technology and tools defined by the team" },
        { level: 2, name: "Specializes", description: "is the go-to person for one or more technologies and takes initiative to learn new ones" },
        { level: 3, name: "Evangelizes", description: "researches, creates proofs of concept and introduces new technologies to the team" },
        { level: 4, name: "Masters",     description: "has very deep knowledge about the whole technology stack of the system" },
        { level: 5, name: "Creates",     description: "designs and creates new technologies that are widely used either by internal or external teams" },
      ],
    },
    {
      name: "System",
      levels: [
        { level: 1, name: "Enhances", description: "successfully pushes new features and bug fixes to improve and extend the system" },
        { level: 2, name: "Designs",  description: "designs and implements medium to large size features while reducing the system's tech debt" },
        { level: 3, name: "Owns",     description: "owns the production operation and monitoring of the system and is aware of its SLAs" },
        { level: 4, name: "Evolves",  description: "evolves the architecture to support future requirements and defines its SLAs" },
        { level: 5, name: "Leads",    description: "leads the technical excellence of the system and creates plans to mitigate outages" },
      ],
    },
    {
      name: "People",
      levels: [
        { level: 1, name: "Learns",      description: "quickly learns from others and consistently steps up when it is required" },
        { level: 2, name: "Supports",    description: "proactively supports other team members and helps them to be successful" },
        { level: 3, name: "Mentors",     description: "mentors others to accelerate their career-growth and encourages them to participate" },
        { level: 4, name: "Coordinates", description: "coordinates team members providing effective feedback and moderating discussions" },
        { level: 5, name: "Manages",     description: "manages the team members' career, expectations, performance and level of happiness" },
      ],
    },
    {
      name: "Process",
      levels: [
        { level: 1, name: "Follows",    description: "follows the team processes, delivering a consistent flow of features to production" },
        { level: 2, name: "Enforces",   description: "enforces the team processes, making sure everybody understands the benefits and tradeoffs" },
        { level: 3, name: "Challenges", description: "challenges the team processes, looking for ways to improve them" },
        { level: 4, name: "Adjusts",    description: "adjusts the team processes, listening to feedback and guiding the team through the changes" },
        { level: 5, name: "Defines",    description: "defines the right processes for the team's maturity level, balancing agility and discipline" },
      ],
    },
    {
      name: "Influence",
      levels: [
        { level: 1, name: "Subsystem",      description: "makes an impact on one or more subsystems" },
        { level: 2, name: "Team",           description: "makes an impact on the whole team, not just on specific parts of it" },
        { level: 3, name: "Multiple Teams", description: "makes an impact not only on their team but also on other teams" },
        { level: 4, name: "Company",        description: "makes an impact on the whole tech organization" },
        { level: 5, name: "Community",      description: "makes an impact on the tech community" },
      ],
    },
  ],
  maxRank: 5,
  roles: [
    { label: "D1",   category: "Developer",                   rank: [1, 1, 1, 1, 1] },
    { label: "D2",   category: "Developer",                   rank: [1, 2, 2, 2, 1] },
    { label: "D3",   category: "Developer",                   rank: [2, 2, 2, 3, 2] },
    { label: "D4",   category: "Developer",                   rank: [3, 3, 3, 3, 2] },
    { label: "D5",   category: "Developer",                   rank: [4, 4, 3, 4, 3] },
    { label: "D6",   category: "Developer",                   rank: [5, 5, 3, 4, 4] },
    { label: "D7",   category: "Developer",                   rank: [5, 5, 3, 4, 5] },
    { label: "TL4",  category: "Tech Lead",                   rank: [2, 3, 4, 4, 1] },
    { label: "TL5",  category: "Tech Lead",                   rank: [3, 4, 4, 5, 2] },
    { label: "TL6",  category: "Tech Lead",                   rank: [4, 5, 4, 5, 3] },
    { label: "TL7",  category: "Tech Lead",                   rank: [4, 5, 4, 5, 4] },
    { label: "TPM4", category: "Technical Project Manager",   rank: [2, 2, 4, 4, 3] },
    { label: "TPM5", category: "Technical Project Manager",   rank: [2, 2, 4, 5, 3] },
    { label: "TPM6", category: "Technical Project Manager",   rank: [2, 3, 5, 5, 4] },
    { label: "TPM7", category: "Technical Project Manager",   rank: [2, 4, 5, 5, 5] },
    { label: "EM5",  category: "Engineering Manager",         rank: [3, 3, 5, 4, 2] },
    { label: "EM6",  category: "Engineering Manager",         rank: [3, 4, 5, 5, 2] },
    { label: "EM7",  category: "Engineering Manager",         rank: [3, 4, 5, 5, 3] },
  ],
};
