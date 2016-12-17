import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

import CustomFieldForm from './CustomFieldForm';
import { CsvToArray, MultipleLinesToArray } from '../../../form-filler/helpers';
import { shapeOfCustomField } from '../../prop-types';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

class CustomFieldModal extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.props.closeModal();
  }

  handleSubmit(customField) {
    const preparedCustomField = Object.assign({}, customField, {
      match: CsvToArray(customField.match),
      list: customField.list ? MultipleLinesToArray(customField.list) : undefined,
    });

    this.props.onSave(preparedCustomField);
  }

  render() {
    const customField = this.props.customField;

    // const initialValues = {
    //   initialValues: Object.assign({}, customField, {
    //     match: customField.match ? customField.match.join(', ') : '',
    //   }),
    // };

    return (
      <Modal
        className="modal-dialog"
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.handleClose}
        contentLabel="Custom Field Modal"
        style={customStyles}
      >
        <CustomFieldForm
          customField={customField}
          onSubmit={this.handleSubmit}
          onClose={this.handleClose}
          // {...initialValues}
        />
      </Modal>
    );
  }
}

CustomFieldModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  customField: shapeOfCustomField.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CustomFieldModal;