export const allScopes = [
  // privileges
  'VIEW_PRIVILEGES',
  'ADD_PRIVILEGES',
  'EDIT_PRIVILEGES',
  'ARCHIVE_PRIVILEGES',

  // accounts
  'VIEW_ACCOUNTS',
  'ADD_ACCOUNTS',
  'EDIT_ACCOUNTS',
  'EDIT_ACCOUNTS_PRIVILEGE',
  'ARCHIVE_ACCOUNTS',

  // checkins
  'VIEW_CHECKINS',
  'ADD_CHECKINS',

  // lots
  'VIEW_LOTS',
  'ADD_LOTS',
  'EDIT_LOTS',
  'ARCHIVE_LOTS',

  // projects
  'VIEW_PROJECTS',
  'ADD_PROJECTS',
  'EDIT_PROJECTS',
  'ARCHIVE_PROJECTS',

  // reports
  'VIEW_REPORTS',
  'ADD_REPORTS',
  'EDIT_REPORTS',
  'APPROVE_REPORTS',
  'COMMENT_ON_REPORTS',
  'ARCHIVE_REPORTS',

  // summary stats
  'VIEW_SUMMARY_STATS',
] as const;

export type Scope = typeof allScopes[number];
