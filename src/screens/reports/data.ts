export type PlanSectionType = {
  name: string;
  id: string;
  sectionItems: SectionItems[];
};

type SectionItems = {
  name: string;
  id: string;
  units: UnitType[];
};

type UnitType = {
  id: string;
  quantity: number;
  rate: number;
  name: string;
  unit: string;
  planned?: string;
  executed?: string;
};

//sample data

export const ProjectPlanSection: PlanSectionType[] = [
  {
    name: 'classroom',
    id: '1',
    sectionItems: [
      {
        name: 'earth work ',
        id: '1',
        units: [
          {
            id: '1',
            quantity: 58,
            rate: 1.22,
            name: 'clear',
            unit: 'm2',
            planned: '',
            executed: '',
          },
        ],
      },
    ],
  },
];

// export const ProjectPlanSectin: PlanSectionType[] = [
//     {
//         name: 'classroom',
//         id: '1',
//         sectionItems: [
//             {
//                 name: 'EXCAVATION & EARTH WORK',
//                 id: '1',
//                 units: [
//                     {
//                         id: '1',
//                         unit: 'm2',
//                         name: 'Clear the site to a depth of 200mm to remove top soil.',
//                         quantity: 587.14,
//                         rate: 14.4,
//                     },
//                     {
//                         id: '1',
//                         unit: 'm3',
//                         name:
//                             'Bulk excavation in ordinary soil to a depth not exceeding 1500mm from stripped ground level.',
//                         quantity: 266.78,
//                         rate: 72,
//                     },
//                 ],
//             },
//             {
//                 name: 'Concrete work',
//                 id: '2',
//                 units: [
//                     {
//                         id: '1',
//                         unit: 'm2',
//                         name:
//                             '5cm thick lean concrete in C-5 with minimum cement content of 150kg/m3 of concrete under:',
//                         quantity: 587.14,
//                         rate: 14.4,
//                     },
//                     {
//                         id: '1',
//                         unit: 'm3',
//                         name:
//                             'Bulk excavation in ordinary soil to a depth not exceeding 1500mm from stripped ground level.',
//                         quantity: 266.78,
//                         rate: 72,
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         name: 'Labratory',
//         id: '1',
//         sectionItems: [
//             {
//                 name: 'EXCAVATION & EARTH WORK',
//                 id: '1',
//                 units: [
//                     {
//                         id: '1',
//                         unit: 'm2',
//                         name: 'Clear the site to a depth of 200mm to remove top soil.',
//                         quantity: 587.14,
//                         rate: 14.4,
//                     },
//                     {
//                         id: '1',
//                         unit: 'm3',
//                         name:
//                             'Bulk excavation in ordinary soil to a depth not exceeding 1500mm from stripped ground level.',
//                         quantity: 266.78,
//                         rate: 72,
//                     },
//                 ],
//             },
//             {
//                 name: 'Concrete work',
//                 id: '2',
//                 units: [
//                     {
//                         id: '1',
//                         unit: 'm2',
//                         name:
//                             '5cm thick lean concrete in C-5 with minimum cement content of 150kg/m3 of concrete under:',
//                         quantity: 587.14,
//                         rate: 14.4,
//                     },
//                     {
//                         id: '1',
//                         unit: 'm3',
//                         name:
//                             'Bulk excavation in ordinary soil to a depth not exceeding 1500mm from stripped ground level.',
//                         quantity: 266.78,
//                         rate: 72,
//                     },
//                 ],
//             },
//         ],
//     },
// ]
