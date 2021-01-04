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