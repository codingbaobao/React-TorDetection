import React, {Component} from 'react';
import {FormGroup,ControlLabel, FormControl,HelpBlock, Table} from 'react-bootstrap'
import './Pcap.css'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class Pcap extends Component {
  render() {
    return ( 
      <div>
        <span className="font">HELLO PCAP</span>
        <div className="upload container">
          <FieldGroup
            id="formControlsFile"
            type="file"
            label="File"
            help="Example block-level help text here."
          />
        </div>
        <div className="table">
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th> Source Port</th>
                <th>Destination IP</th>
                <th>Destination Port</th>
                <th>Protocol</th>
                <th>Flow Duration</th>
                <th>Label</th>
              </tr>
            </thead> 
            <tbody>
              <tr>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
              </tr>
              <tr>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
                <td>123</td>
              </tr>
            </tbody>
          </Table>            
        </div>
      </div>
    )
  }
}

export default Pcap;
