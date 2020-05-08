import { v4 as uuidv4 } from 'uuid';

export default [
  {
    id: uuidv4(),
    title: 'Planned Tasks',
    cards: [
      {
        id: uuidv4(),
        name: '2 Gallons of milk at the Deli store',
        type: 'text',
        required: false,
      },
      {
        id: uuidv4(),
        name: 'Dispose Garbage',
        type: 'textArea',
        required: false,
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'Work In Progress',
    cards: [
      {
        id: uuidv4(),
        name: 'Clean House',
        type: 'number',
        required: true,
      },
    ],
  },
];
