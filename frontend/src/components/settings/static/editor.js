import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { trim } from 'lodash';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';
import 'react-quill/dist/quill.snow.css';

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
    insertItem(item);
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
    const { formValue } = this.props;
    const value = formValue?.body;
    return (
      <ReactQuill
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={value}
        onChange={this.handleContentChange}
      ></ReactQuill>
    );
  }
}

export default Editor;
