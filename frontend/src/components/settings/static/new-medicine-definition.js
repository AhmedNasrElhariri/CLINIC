import React, { useMemo } from 'react';
import { Form, Schema , FormGroup, RadioGroup, Radio ,FormControl,Checkbox} from 'rsuite';

import { CRModal, CRTextInput , CRRadio ,CRCheckBox ,CRNestedSelector,H6} from 'components';
const data = [
  {
    "value": "1",
    "label": "四川",
    "children": [
      {
        "label": "成都市",
        "value": "1-1",
        "children": [
          {
            "value": "1-1-1",
            "label": "锦江区"
          },
          {
            "value": "1-1-2",
            "label": "青羊区"
          },
          {
            "value": "1-1-3",
            "label": "金牛区"
          },
          {
            "value": "1-1-4",
            "label": "武侯区"
          },
          {
            "value": "1-1-5",
            "label": "成华区"
          }
        ]
      },
      {
        "value": "1-2",
        "label": "自贡市",
        "children": [
          {
            "value": "1-2-1",
            "label": "自流井区"
          },
          {
            "value": "1-2-2",
            "label": "贡井区"
          },
          {
            "value": "1-2-3",
            "label": "大安区"
          },
          {
            "value": "1-2-4",
            "label": "沿滩区"
          },
          {
            "value": "1-2-5",
            "label": "荣　县"
          },
          {
            "value": "1-2-6",
            "label": "富顺县"
          }
        ]
      },
      {
        "value": "1-3",
        "label": "攀枝花市",
        "children": [
          {
            "value": "1-3-1",
            "label": "东　区"
          },
          {
            "value": "1-3-2",
            "label": "西　区"
          },
          {
            "value": "1-3-3",
            "label": "仁和区"
          },
          {
            "value": "1-3-4",
            "label": "米易县"
          },
          {
            "value": "1-3-5",
            "label": "盐边县"
          }
        ]
      }
    ]
  },
  {
    "label": "贵州",
    "value": "2",
    "children": [
      {
        "value": "2-1",
        "label": "贵阳市",
        "children": [
          {
            "value": "2-1-1",
            "label": "南明区"
          },
          {
            "value": "2-1-2",
            "label": "云岩区"
          },
          {
            "value": "2-1-3",
            "label": "花溪区"
          },
          {
            "value": "2-1-4",
            "label": "乌当区"
          },
          {
            "value": "2-1-5",
            "label": "白云区"
          },
          {
            "value": "2-1-6",
            "label": "小河区"
          },
          {
            "value": "2-1-7",
            "label": "开阳县"
          },
          {
            "value": "2-1-8",
            "label": "息烽县"
          },
          {
            "value": "2-1-9",
            "label": "修文县"
          },
          {
            "value": "2-1-10",
            "label": "清镇市"
          }
        ]
      },
      {
        "value": "2-2",
        "label": "六盘水市",
        "children": [
          {
            "value": "2-2-1",
            "label": "钟山区"
          },
          {
            "value": "2-2-2",
            "label": "六枝特区"
          },
          {
            "value": "2-2-3",
            "label": "水城县"
          },
          {
            "value": "2-2-4",
            "label": "盘　县"
          }
        ]
      },
      {
        "value": "2-3",
        "label": "遵义市",
        "children": [
          {
            "value": "2-3-1",
            "label": "红花岗区"
          },
          {
            "value": "2-3-2",
            "label": "汇川区"
          },
          {
            "value": "2-3-3",
            "label": "遵义县"
          },
          {
            "value": "2-3-4",
            "label": "桐梓县"
          },
          {
            "value": "2-3-5",
            "label": "绥阳县"
          },
          {
            "value": "2-3-6",
            "label": "正安县"
          },
          {
            "value": "2-3-7",
            "label": "道真仡佬族苗族自治县"
          },
          {
            "value": "2-3-8",
            "label": "务川仡佬族苗族自治县"
          },
          {
            "value": "2-3-9",
            "label": "凤冈县"
          },
          {
            "value": "2-3-10",
            "label": "湄潭县"
          },
          {
            "value": "2-3-11",
            "label": "余庆县"
          },
          {
            "value": "2-3-12",
            "label": "习水县"
          },
          {
            "value": "2-3-13",
            "label": "赤水市"
          },
          {
            "value": "2-3-14",
            "label": "仁怀市"
          }
        ]
      },
      {
        "value": "2-4",
        "label": "安顺市",
        "children": [
          {
            "value": "2-4-1",
            "label": "西秀区"
          },
          {
            "value": "2-4-2",
            "label": "平坝县"
          },
          {
            "value": "2-4-3",
            "label": "普定县"
          },
          {
            "value": "2-4-4",
            "label": "镇宁布依族苗族自治县"
          },
          {
            "value": "2-4-5",
            "label": "关岭布依族苗族自治县"
          },
          {
            "value": "2-4-6",
            "label": "紫云苗族布依族自治县"
          }
        ]
      }
    ]
  }
]; 
const model = Schema.Model({});
const medicineFormValues = [
  {
    value: "tablets",
    name: "Tablets"
  },
  {
    value: "capsules",
    name: "Capsules"
  },
  {
    value: "syrup",
    name: "Syrup"
  },
  {
    value: "drops",
    name: "Drops"
  },
  {
    value: "cream/ointment",
    name: "Cream/ointment"
  },
  {
    value: "power",
    name: "Power"
  },
  {
    value: "amp",
    name: "AMP"
  },
  {
    value: "sachets",
    name: "Sachets"
  },
  {
    value: "vial",
    name: "Vial"
  }
];



function NewMedicine({ formValue, onChange, type, visible, onOk, onClose }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Medicine' : 'Edit Medicine '),
    [type]
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} model={model} onChange={onChange} fluid>
        <CRTextInput label="Medicine Name" name="medicineName" placeholder="Type Name" block/>
        <CRTextInput label="Concentration" name="concentration" placeholder="Type Concentration" block />
        <CRRadio label="Medicine Form" name="medicineForm" medicineFormValues={medicineFormValues} onChange={onChange} formValue={formValue} />
      </Form>
    </CRModal>
  );
}

NewMedicine.defaultProps = {
  type: 'create',
};

export default NewMedicine;
