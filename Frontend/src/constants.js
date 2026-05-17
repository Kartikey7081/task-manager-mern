export const PRIORITIES = {
  high:   { label: 'High',   color: '#e63946', bg: 'rgba(230,57,70,0.15)'  },
  medium: { label: 'Medium', color: '#f5a623', bg: 'rgba(245,166,35,0.15)' },
  low:    { label: 'Low',    color: '#52b788', bg: 'rgba(82,183,136,0.15)' },
};

export const CATEGORIES = ['Work', 'Personal', 'Health', 'Shopping', 'Study', 'Other'];

export const CAT_COLORS = {
  Work:     '#4ea8de',
  Personal: '#9d4edd',
  Health:   '#52b788',
  Shopping: '#f5a623',
  Study:    '#e94560',
  Other:    '#8b8aad',
};

export const SORT_OPTIONS = [
  { value: 'created',  label: 'Newest first'  },
  { value: 'priority', label: 'By priority'   },
  { value: 'dueDate',  label: 'By due date'   },
  { value: 'alpha',    label: 'A → Z'         },
];
