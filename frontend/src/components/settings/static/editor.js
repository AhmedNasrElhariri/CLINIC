import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { trim } from 'lodash';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const ReactQuillModified = styled(ReactQuill)`
  & .ql-snow * {
    direction: rtl;
    text-align: right;
  }
  @media print {
    @page {
      margin-right: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
  }
  @media print and (max-width: 499px){
    @page {
      margin-right: ${props => props.mr}px;
      margin-top: ${props => props.mt}px;
      margin-bottom: ${props => props.mb}px;
      margin-left: ${props => props.ml}px;
    }
  }
  @media print and (max-width: 595 px) and (min-width: 500px){
    @page {
      margin-right: ${props => props.mr}px;
      margin-top: ${props => props.mt}px;
      margin-bottom: ${props => props.mb}px;
      margin-left: ${props => props.ml}px;
    }
  }
  @media print and (max-width: 791px) and (min-width: 596px){
    @page {
      margin-right: ${props => props.mr}px;
      margin-top: ${props => props.mt}px;
      margin-bottom: ${props => props.mb}px;
      margin-left: ${props => props.ml}px;
    }
  }
  @media print and (max-width: 842px) and (min-width: 792px) {
    @page {
      margin-right: ${props => props.mr}px;
      margin-top: ${props => props.mt}px;
      margin-bottom: ${props => props.mb}px;
      margin-left: ${props => props.ml}px;
    }
  }
`;

const toolbarOptions = ['bold'];
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  handleContentChange = (content, delta, source, editor) => {
    const { onChange } = this.props;
    if (!onChange || source !== 'user') {
      return;
    }
    const text = trim(editor.getText());
    if (!text) {
      content = '';
    }
    onChange(content);
  };
  handleSource = (searchTerm, renderItem, mentionChar) => {
    let values;
    if (mentionChar === '@' || mentionChar === '#') {
      values = this.props.mentionValues;
    }
    if (searchTerm.length === 0) {
      renderItem(values, searchTerm);
    } else {
      const matches = [];
      for (let i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
          matches.push(values[i]);
      renderItem(matches, searchTerm);
    }
  };
  handleSelect = (item, insertItem) => {
    const { formValue } = this.props;
    const newValue = formValue.context + '_' + item.value;
    const newItem = { ...item, denotationChar: '$', value: newValue };
    insertItem(newItem);
  };
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
    ],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: this.handleSource,
      onSelect: this.handleSelect,
    },
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'direction',
    'bullet',
    'indent',
    'link',
    'image',
    'mention',
  ];

  render() {
    const { formValue, pageSetupData } = this.props;
    const value = formValue?.body;
    return (
      <ReactQuillModified
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={value}
        onChange={this.handleContentChange}
        mt={pageSetupData.top || 0}
        mr={pageSetupData.right || 0}
        mb={pageSetupData.bottom || 0}
        ml={pageSetupData.left || 0}
        type={pageSetupData.type || 'Letter'}
      ></ReactQuillModified>
    );
  }
}

export default Editor;
