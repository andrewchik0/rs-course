import React, { useState } from 'react';

import Card from '../../components/Card/Card';
import catBreeds from '../../assets/cat-breeds.json';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { cardSlice } from '../../store/reducers/CardSlice';

export default function CreateCardPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [successShown, setSuccessShown] = useState(false);
  const { addCard } = cardSlice.actions;
  const { cards } = useAppSelector((state) => state.cardReducer);
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) => {
    const card = {
      name: data.name,
      birthday: new Date(data.date).getTime(),
      breed: data.breed,
      gender: data.gender,
      microchipped: data.microchipped,
      img: URL.createObjectURL(data.image[0]),
    };
    dispatch(addCard(card));
    setSuccessShown(true);
    setTimeout(() => {
      setSuccessShown(false);
    }, 3000);
    reset();
  };

  new Date().setFullYear(1970);
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="name-input">
            Name<span style={{ color: 'red' }}>*</span>:
          </label>
          <div>
            <input
              className="form-input"
              type="text"
              id="name-input"
              {...register('name', { required: '\u26A0 Enter name of the cat' })}
              placeholder="Enter name"
            />
          </div>
          {errors.name && <div className="error-validation">{errors.name.message?.toString()}</div>}
        </div>

        <div className="form-field">
          <label htmlFor="date-input">
            Cat birthday<span style={{ color: 'red' }}>*</span>:
          </label>
          <div>
            <input
              className="form-input"
              type="date"
              id="date-input"
              {...register('date', {
                required: '\u26A0 Enter a valid birthday',
                validate: {
                  lessThenToday: (date) =>
                    new Date(date).getTime() <= Date.now() ||
                    '\u26A0 Date should be less than today\x27s date',
                  moreThen1970: (date) =>
                    new Date(date).getTime() > new Date().setFullYear(1970) ||
                    '\u26A0 Enter a valid date',
                },
              })}
            />
          </div>
          {errors.date && <div className="error-validation">{errors.date.message?.toString()}</div>}
        </div>

        <div className="form-field">
          <label htmlFor="breed">
            Breed<span style={{ color: 'red' }}>*</span>:
          </label>
          <div>
            <select
              className="form-input"
              id="breed"
              {...register('breed', { required: '\u26A0 Select breed' })}
            >
              <option value="">Select breed ...</option>
              {catBreeds.map((breed, idx) => (
                <option key={idx} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          {errors.breed && (
            <div className="error-validation">{errors.breed.message?.toString()}</div>
          )}
        </div>

        <div className="form-field">
          <div>
            Gender<span style={{ color: 'red' }}>*</span>:
          </div>
          <div>
            <input
              type="radio"
              value="male"
              id="male"
              className="form-radio"
              {...register('gender', { required: '\u26A0 Select gender' })}
            />
            <label htmlFor="male">&nbsp;Male</label>
          </div>
          <div>
            <input
              type="radio"
              value="female"
              id="female"
              className="form-radio"
              {...register('gender', { required: '\u26A0 Select gender' })}
            />
            <label htmlFor="female">&nbsp;Female</label>
          </div>
          {errors.gender && (
            <div className="error-validation">{errors.gender.message?.toString()}</div>
          )}
        </div>

        <div className="form-field">
          <input
            type="checkbox"
            className="form-checkbox"
            id="microchipped-checkbox"
            {...register('microchipped')}
          />
          <label htmlFor="microchipped-checkbox">&nbsp;Microchipped</label>
        </div>

        <div className="form-field">
          <label htmlFor="image">
            Image<span style={{ color: 'red' }}>*</span>:
          </label>
          <div>
            <label className="custom-file-upload" htmlFor="image">
              Upload Image
            </label>
            <span id="file-selected">
              &nbsp;
              {(watch('image') && watch('image').length && watch('image')[0].name) ||
                'Choose a file'}
            </span>
            <input
              className="form-input image-input"
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              {...register('image', {
                validate: {
                  required: (files) => files.length || '\u26A0 Image required',
                  lessThan4MB: (files) =>
                    files[0]?.size < 1024 * 1024 * 4 || '\u26A0 Max size is 4MB',
                  acceptedFormats: (files) =>
                    ['image/jpeg', 'image/png'].includes(files[0]?.type) ||
                    '\u26A0 Only PNG, JPEG or JPG files accepted',
                },
              })}
            />
          </div>
          {errors.image && (
            <div className="error-validation">{errors.image.message?.toString()}</div>
          )}
        </div>

        <div>
          <button className="form-field submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className="success-message" style={{ opacity: successShown ? 1.0 : 0.0 }}>
        <span style={{ fontWeight: 1000 }}>&#10003;</span> Card has been submitted
      </div>

      <div className="card-container" style={{ fontSize: '15px' }}>
        {cards.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </div>
    </div>
  );
}
