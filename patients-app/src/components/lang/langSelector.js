import React, { useState } from "react";
import { Radio, RadioGroup, Form } from "rsuite";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const LangContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px;
`;
const LangSelector = () => {
  const { i18n } = useTranslation();
  //   const [selectedLang, setSelectedLang] = useState("ar");
  const changeTheLanguage = (value) => {
    // setSelectedLang(value);
    i18n.changeLanguage(value);
  };
  const lang = i18n.language;
  return (
    <LangContainer>
      <Form.Group controlId="radioList">
        <RadioGroup
          name="radioList"
          inline
          appearance="picker"
          defaultValue="ar"
          value={lang}
          style={{ backgroundColor: "#ffff" }}
          onChange={(value) => {
            changeTheLanguage(value);
          }}
        >
          <Radio value="ar">عربي</Radio>
          <Radio value="en">English</Radio>
        </RadioGroup>
      </Form.Group>
    </LangContainer>
  );
};

export default LangSelector;
