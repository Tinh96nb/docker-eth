import React from 'react';
import { saveToIpfs } from 'utils/helper/ipfs';

class UploadFile extends React.Component {
  constructor () {
    super()
    this.state = {
      nameFile: null
    }
    this.handleselectedFile = this.handleselectedFile.bind(this);
  }

  async handleselectedFile(event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0];
    this.setState({ nameFile: file.name})
    let reader = new window.FileReader()
    reader.onload = async () => {
      const result = await saveToIpfs(reader);
      result['name'] = file.name;
      this.props.getInfo(result);
      this.setState({added_file_hash: result.path})
    }
    reader.readAsDataURL(file);
  }

  render () {
    return (
      <div className="d-flex justify-content-center mb-3">
        <div className="col col-md-4">
          <input className="custom-file-input" type="file" onChange={this.handleselectedFile} />
          <label className="custom-file-label">{this.state.nameFile ? this.state.nameFile: 'Choose file'}</label>
        </div>
      </div>
    )
  }
}
export default UploadFile;