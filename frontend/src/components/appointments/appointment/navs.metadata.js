import { Input } from 'rsuite';

import LabAndImagingTests from './labs-and-imaging';
import VitalDataForm from './vital-data';

export default [
  {
    title: 'Vital Data',
    to: 'vitalData',
    name: 'vitalData',
    element: VitalDataForm,
    defaultValue: {
      weight: -1,
      height: -1,
      pulse: -1,
      temp: -1,
      glucoseLevel: -1,
    },
  },
  {
    title: 'Complain',
    to: 'complain',
    name: 'complain',
    element: Input,
    componentClass: 'textarea',
    rows: 10,
    placeholder: 'Complain',
  },
  {
    title: 'Signs',
    to: 'signs',
    name: 'signs',
    element: Input,
    componentClass: 'textarea',
    rows: 10,
    placeholder: 'Signs',
  },
  {
    title: 'Labs & Imaging',
    to: 'labs',
    name: 'labs',
    element: LabAndImagingTests,
    defaultValue: [],
  },
  {
    title: 'Treatment',
    to: 'treatment',
    name: 'treatment',
    element: Input,
    componentClass: 'textarea',
    rows: 10,
    placeholder: 'Treatment',
  },
  {
    title: 'Recommendations',
    to: 'recommendations',
    name: 'recommendations',
    element: Input,
    componentClass: 'textarea',
    rows: 10,
    placeholder: 'Recommendations',
  },
];
