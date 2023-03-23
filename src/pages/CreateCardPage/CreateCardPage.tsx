import React from 'react';

import catBreeds from '../../assets/cat-breeds.json';

export default class CreateCardPage extends React.Component {

  render(): React.ReactNode {
    return (
      <div className="form-container">
        <form className="form">
          <div className="form-field">
            <label htmlFor="name-input">Name:</label>
            <div>
              <input className="form-input" id="name-input" type="text" />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="date-input">Cat birthday: </label>
            <div>
              <input className="form-input" id="date-input" type="date" />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="breed">Breed:</label>
            <div>
              <select className="form-input" id="breed" placeholder="Select breed...">
                {catBreeds.map((breed) => <option value={breed}>{breed}</option>)}
              </select>
            </div>
          </div>

          <div className="form-field">
            <div>Gender:</div>
            <div>
              <input type="radio" id="male" name="gender" value="male" className="form-radio"/>
              <label htmlFor="male">&nbsp;Male</label>
            </div>
            <div>
              <input type="radio" id="female" name="gender" value="female" className="form-radio"/>
              <label htmlFor="female">&nbsp;Female</label>
            </div>
          </div>

          <div className="form-field">
            <input id="microchipped-checkbox" type="checkbox" className="form-checkbox"/>
            <label htmlFor="microchipped-checkbox">&nbsp;Microchipped</label>
          </div>

          <div className="form-field">
            <label htmlFor="image">Image:</label>
            <div>
              <label className="custom-file-upload" htmlFor="image">Upload image</label>
              <span id="file-selected"></span>
              <input className="form-input image-input" id="image" type="file" />
            </div>
          </div>

          <div>
            <button className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
