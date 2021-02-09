import { useMemo } from 'react';

function useBranches() {
  const branches = [
    {
      id: '1',
      name: 'cairo',
      specialties: [
        {
          id: '1',
          name: 'عظام',
          doctors: [
            {
              id: '1',
              name: 'ahmed',
            },
            {
              id: '2',
              name: 'mona',
            },
          ],
        },
        {
          id: '2',
          name: 'رمد',
          doctors: [
            {
              id: '1',
              name: 'osama',
            },
            {
              id: '2',
              name: 'mona',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Giza',
      specialties: [
        {
          id: '1',
          name: 'عظام',
          doctors: [
            {
              id: '1',
              name: 'ahmed',
            },
            {
              id: '2',
              name: 'mona',
            },
          ],
        },
        {
          id: '2',
          name: 'انف',
          doctors: [
            {
              id: '1',
              name: 'ahmed',
            },
            {
              id: '2',
              name: 'mona',
            },
          ],
        },
        {
          id: '3',
          name: 'جراحه اطفال',
          doctors: [
            {
              id: '1',
              name: 'ahmed',
            },
            {
              id: '2',
              name: 'tarek',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Monofia',
      specialties: [
        {
          id: '1',
          name: 'جراحه',
          doctors: [
            {
              id: '1',
              name: 'eslam',
            },
            {
              id: '2',
              name: 'mona',
            },
            {
              id: '3',
              name: 'nermeen',
            },
          ],
        },
        {
          id: '2',
          name: 'انف',
          doctors: [
            {
              id: '1',
              name: 'sara',
            },
            {
              id: '2',
              name: 'mhmd',
            },
            {
              id: '3',
              name: 'nermeen',
            },
          ],
        },
      ],
    },
  ];

  return useMemo(
    () => ({
      branches,
    }),
    [branches]
  );
}

export default useBranches;
