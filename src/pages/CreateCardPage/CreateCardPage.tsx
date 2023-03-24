import React from 'react';

import Card from '../../components/Card/Card';
import ICard from 'models/CardModel';
import catBreeds from '../../assets/cat-breeds.json';

export default class CreateCardPage extends React.Component {
  private birthday: React.RefObject<HTMLInputElement>;
  private name: React.RefObject<HTMLInputElement>;
  private breed: React.RefObject<HTMLSelectElement>;
  private male: React.RefObject<HTMLInputElement>;
  private female: React.RefObject<HTMLInputElement>;
  private imageFile: React.RefObject<HTMLInputElement>;
  private isMicrochipped: React.RefObject<HTMLInputElement>;
  state: {
    nameValid: boolean;
    dateValid: boolean;
    breedValid: boolean;
    genderValid: boolean;
    imageValid: boolean;
    imageName: string;
    cards: ICard[];
    successShown: boolean;
  };

  constructor(props: Record<string, never>) {
    super(props);

    this.name = React.createRef();
    this.birthday = React.createRef();
    this.breed = React.createRef();
    this.male = React.createRef();
    this.female = React.createRef();
    this.isMicrochipped = React.createRef();
    this.imageFile = React.createRef();
    this.state = {
      imageName: 'Choose a file',
      nameValid: true,
      dateValid: true,
      breedValid: true,
      genderValid: true,
      imageValid: true,
      cards: [],
      successShown: false,
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const image = !(
      !this.imageFile.current?.files?.length ||
      (this.imageFile.current.files[0].name.split('.').pop() != 'jpg' &&
        this.imageFile.current.files[0].name.split('.').pop() != 'jpeg' &&
        this.imageFile.current.files[0].name.split('.').pop() != 'png' &&
        this.imageFile.current.files[0].name.split('.').pop() != 'bmp')
    );

    const date = !(
      !this.birthday.current?.value ||
      new Date(this.birthday.current.value).getTime() > Date.now() ||
      new Date(this.birthday.current.value).getTime() < 0
    );

    this.setState(
      {
        nameValid: this.name.current?.value,
        dateValid: date,
        breedValid: this.breed.current?.value,
        genderValid: this.female.current?.checked || this.male.current?.checked,
        imageValid: image,
      },
      () => {
        if (
          !this.name.current?.value ||
          !this.imageFile.current?.files?.length ||
          !this.birthday.current?.value ||
          !date ||
          !this.breed.current?.value ||
          (!this.female.current?.checked && !this.male.current?.checked) ||
          !image
        ) {
          return;
        }

        this.setState({
          successShown: true,
          cards: this.state.cards.concat([
            {
              name: this.name.current.value,
              img: URL.createObjectURL(this.imageFile.current?.files[0]),
              breed: this.breed.current.value,
              gender: this.female.current?.checked ? 'female' : 'male',
              birthday: new Date(this.birthday.current.value),
              microchipped: this.isMicrochipped.current?.checked || false,
            },
          ]),
          imageName: 'Choose a file',
        });

        this.birthday.current.value = '';
        this.breed.current.value = '';
        if (this.male.current) this.male.current.checked = false;
        if (this.female.current) this.female.current.checked = false;
        this.imageFile.current.value = '';
        if (this.isMicrochipped.current) this.isMicrochipped.current.checked = false;
        this.name.current.value = '';

        setTimeout(() => {
          this.setState({ successShown: false });
        }, 3000);
      }
    );
  }

  render(): React.ReactNode {
    return (
      <div className="form-container">
        <form className="form">
          <div className="form-field">
            <label htmlFor="name-input">
              Name<span style={{ color: 'red' }}>*</span>:
            </label>
            <div>
              <input
                className="form-input"
                id="name-input"
                type="text"
                ref={this.name}
                placeholder="Enter name"
              />
            </div>
            {this.state.nameValid ? (
              <div></div>
            ) : (
              <div className="error-validation">&#x26A0; Enter name of the cat</div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="date-input">
              Cat birthday<span style={{ color: 'red' }}>*</span>:
            </label>
            <div>
              <input className="form-input" id="date-input" type="date" ref={this.birthday} />
            </div>
            {this.state.dateValid ? (
              <div></div>
            ) : (
              <div className="error-validation">&#x26A0; Enter valid birthday</div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="breed">
              Breed<span style={{ color: 'red' }}>*</span>:
            </label>
            <div>
              <select className="form-input" id="breed" ref={this.breed}>
                <option value="">Select breed ...</option>
                {catBreeds.map((breed, idx) => (
                  <option key={idx} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
            {this.state.breedValid ? (
              <div></div>
            ) : (
              <div className="error-validation">&#x26A0; Select breed</div>
            )}
          </div>

          <div className="form-field">
            <div>
              Gender<span style={{ color: 'red' }}>*</span>:
            </div>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="form-radio"
                ref={this.male}
              />
              <label htmlFor="male">&nbsp;Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="form-radio"
                ref={this.female}
              />
              <label htmlFor="female">&nbsp;Female</label>
            </div>
            {this.state.genderValid ? (
              <div></div>
            ) : (
              <div className="error-validation">&#x26A0; Select gender</div>
            )}
          </div>

          <div className="form-field">
            <input
              id="microchipped-checkbox"
              type="checkbox"
              className="form-checkbox"
              ref={this.isMicrochipped}
            />
            <label htmlFor="microchipped-checkbox">&nbsp;Microchipped</label>
          </div>

          <div className="form-field">
            <label htmlFor="image">
              Image<span style={{ color: 'red' }}>*</span>:
            </label>
            <div>
              <label className="custom-file-upload" htmlFor="image">
                Upload image
              </label>
              <span id="file-selected">&nbsp;{this.state.imageName}</span>
              <input
                className="form-input image-input"
                id="image"
                type="file"
                ref={this.imageFile}
                onChange={({ target: { files } }) => {
                  if (files?.length) {
                    this.setState({ imageName: files[0].name });
                  }
                }}
              />
            </div>
            {this.state.imageValid ? (
              <div></div>
            ) : (
              <div className="error-validation">&#x26A0; This is not an image</div>
            )}
          </div>

          <div>
            <button className="form-field submit-button" type="button" onClick={this.submit}>
              Submit
            </button>
          </div>
        </form>

        <div className="success-message" style={{ opacity: this.state.successShown ? 1.0 : 0.0 }}>
          <span style={{ fontWeight: 1000 }}>&#10003;</span> Card has been submitted
        </div>

        <div className="card-container" style={{ fontSize: '15px' }}>
          {this.state.cards.map((card, idx) => (
            <Card key={idx} card={card} />
          ))}
        </div>
      </div>
    );
  }
}
